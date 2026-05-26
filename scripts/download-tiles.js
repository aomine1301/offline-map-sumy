import fs from 'fs';
import path from 'path';
import https from 'https';

// Налаштування меж міст для детального завантаження (зум до рівню будівель)
const CITIES = {
  stetsivka: {
    name: 'с. Стецівка',
    minLat: 51.01,
    minLng: 34.75,
    maxLat: 51.04,
    maxLng: 34.79
  },
  khoten: {
    name: 'с. Хотінь',
    minLat: 51.08,
    minLng: 34.74,
    maxLat: 51.11,
    maxLng: 34.78
  },
  sumy: {
    name: 'Суми (центр та околиці)',
    minLat: 50.87,
    minLng: 34.73,
    maxLat: 50.95,
    maxLng: 34.85
  },
  konotop: {
    name: 'Конотоп (центр та околиці)',
    minLat: 51.21,
    minLng: 33.16,
    maxLat: 51.26,
    maxLng: 33.24
  },
  shostka: {
    name: 'Шостка (центр та околиці)',
    minLat: 51.84,
    minLng: 33.45,
    maxLat: 51.88,
    maxLng: 33.51
  },
  romny: {
    name: 'Ромни (центр)',
    minLat: 50.73,
    minLng: 33.44,
    maxLat: 50.77,
    maxLng: 33.50
  },
  okhtyrka: {
    name: 'Охтирка (центр)',
    minLat: 50.29,
    minLng: 34.86,
    maxLat: 50.33,
    maxLng: 34.92
  },
  hlukhiv: {
    name: 'Глухів (центр)',
    minLat: 51.66,
    minLng: 33.88,
    maxLat: 51.69,
    maxLng: 33.94
  }
};

const REGION_BBOX = {
  name: 'Вся Сумська область',
  minLat: 50.1,
  minLng: 33.1,
  maxLat: 52.4,
  maxLng: 35.7
};

// ВИПРАВЛЕНО: Використовуємо CartoDB Voyager (не блокує та збігається з вашим онлайн-режимом)
const TILE_URL = 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

// ВСТАВТЕ ЦЕЙ РЯДОК:
// const TILE_URL = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png';

const args = process.argv.slice(2);
const maxZoomInput = parseInt(args[0], 10);
const targetLocationKey = args[1] ? args[1].toLowerCase() : 'all';

let bbox = REGION_BBOX;
let maxZoom = isNaN(maxZoomInput) ? 11 : Math.min(Math.max(maxZoomInput, 0), 18);

if (targetLocationKey !== 'all' && CITIES[targetLocationKey]) {
  bbox = CITIES[targetLocationKey];
} else if (targetLocationKey !== 'all') {
  console.log(`Попередження: місто "${targetLocationKey}" не знайдено в базі. Використовуємо межі всієї області.`);
}

if (targetLocationKey === 'all' && maxZoom > 12) {
  console.log(`ПОПЕРЕДЖЕННЯ: Зум ${maxZoom} для ВСІЄЇ області потребує занадто багато тайлів (>15 000+).`);
  console.log(`Обмежено до безпечного рівня зуму 12.`);
  maxZoom = 12;
}

console.log('===================================================');
console.log('      ЗАВАНТАЖУВАЧ ОФЛАЙН ТАЙЛІВ СУМЩИНИ           ');
console.log('===================================================');
console.log(`Цільова локація:  ${bbox.name}`);
console.log(`Область пошуку (Bounding Box):`);
console.log(`  Широта (Lat):  ${bbox.minLat} до ${bbox.maxLat}`);
console.log(`  Довгота (Lng): ${bbox.minLng} до ${bbox.maxLng}`);
console.log(`Максимальний зум: ${maxZoom}`);
console.log(`Джерело тайлів: ${TILE_URL}`);
console.log('---------------------------------------------------');

function latLngToTile(lat, lng, zoom) {
  const latRad = (lat * Math.PI) / 180;
  let x = Math.floor(((lng + 180) / 360) * Math.pow(2, zoom));
  let y = Math.floor(
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
      Math.pow(2, zoom)
  );
  return { x, y };
}

function getTilesForZoom(zoom) {
  const tiles = [];

  if (zoom < 7) {
    const pCenter = latLngToTile((bbox.minLat + bbox.maxLat) / 2, (bbox.minLng + bbox.maxLng) / 2, zoom);
    const radius = zoom <= 2 ? 0 : 1;
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        const x = pCenter.x + dx;
        const y = pCenter.y + dy;
        const maxXY = Math.pow(2, zoom) - 1;
        if (x >= 0 && x <= maxXY && y >= 0 && y <= maxXY) {
          tiles.push({ z: zoom, x, y });
        }
      }
    }
    return tiles;
  }

  const pMin = latLngToTile(bbox.maxLat, bbox.minLng, zoom);
  const pMax = latLngToTile(bbox.minLat, bbox.maxLng, zoom);

  const minX = Math.min(pMin.x, pMax.x);
  const maxX = Math.max(pMin.x, pMax.x);
  const minY = Math.min(pMin.y, pMax.y);
  const maxY = Math.max(pMin.y, pMax.y);

  const buffer = 1;
  const maxTileCoord = Math.pow(2, zoom) - 1;
  const startX = Math.max(0, minX - buffer);
  const endX = Math.min(maxTileCoord, maxX + buffer);
  const startY = Math.max(0, minY - buffer);
  const endY = Math.min(maxTileCoord, maxY + buffer);

  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      tiles.push({ z: zoom, x, y });
    }
  }

  return tiles;
}

let allTiles = [];
for (let z = 0; z <= maxZoom; z++) {
  const zoomTiles = getTilesForZoom(z);
  allTiles = allTiles.concat(zoomTiles);
}

console.log(`Загальна кількість тайлів для завантаження: ${allTiles.length}`);
console.log('Починаємо завантаження...');
console.log('---------------------------------------------------');

const targetDir = path.resolve('public', 'tiles');

function downloadTile(tile) {
  return new Promise((resolve, reject) => {
    const url = TILE_URL.replace('{z}', tile.z).replace('{x}', tile.x).replace('{y}', tile.y);
    const destDir = path.join(targetDir, String(tile.z), String(tile.x));
    const destFile = path.join(destDir, `${tile.y}.png`);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    if (fs.existsSync(destFile)) {
      resolve({ skipped: true });
      return;
    }

    const options = {
      headers: {
        'User-Agent': 'SumyUA-OfflineMapApp/4.0 (contact: support@sumy.ua)',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'uk-UA,uk;q=0.9',
        'Referer': 'https://maps.wikimedia.org/'
      }
    };

    https.get(url, options, (res) => {
      if (res.statusCode === 403) {
        console.error('\nПОМИЛКА 403: Доступ заблоковано сервером.');
        process.exit(1);
      }
      if (res.statusCode === 404) {
        resolve({ error: '404 Не знайдено' });
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Статус HTTP ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(destFile);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve({ success: true });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

let successCount = 0;
let skipCount = 0;
let failCount = 0;
let currentIndex = 0;

async function processNextTile() {
  if (currentIndex >= allTiles.length) {
    console.log('---------------------------------------------------');
    console.log('Завантаження завершено!');
    console.log(`  Успішно завантажено:  ${successCount}`);
    console.log(`  Пропущено (вже були): ${skipCount}`);
    console.log(`  Помилок завантаження: ${failCount}`);
    console.log('===================================================');
    return;
  }

  const tile = allTiles[currentIndex];
  currentIndex++;

  const pct = ((currentIndex / allTiles.length) * 100).toFixed(1);
  const logPrefix = `[${currentIndex}/${allTiles.length}] (${pct}%) Zoom ${tile.z}, X:${tile.x}, Y:${tile.y} => `;

  try {
    const res = await downloadTile(tile);
    if (res.skipped) {
      skipCount++;
      processNextTile();
    } else if (res.error) {
      failCount++;
      console.log(`${logPrefix}Помилка: ${res.error}`);
      setTimeout(processNextTile, 50);
    } else {
      successCount++;
      if (successCount % 25 === 0 || currentIndex === allTiles.length) {
        console.log(`${logPrefix}ОК`);
      }
      // Безпечна затримка для CartoDB (150мс замість 1000мс)
      setTimeout(processNextTile, 5);
    }
  } catch (error) {
    failCount++;
    console.log(`${logPrefix}Помилка мережі: ${error.message}`);
    setTimeout(processNextTile, 500);
  }
}

processNextTile();