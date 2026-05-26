export interface POI {
  id: string;
  name: string;
  nameEn: string;
  lat: number;
  lng: number;
  type: 'city' | 'historical' | 'nature';
  description: string;
  descriptionEn: string;
  population?: string;
}

export const sumyPois: POI[] = [
  {
    id: 'sumy',
    name: 'Суми',
    nameEn: 'Sumy',
    lat: 50.9077,
    lng: 34.7981,
    type: 'city',
    description: 'Обласний центр на річці Псел. Заснований у 1655 році полковником Герасимом Кондратьєвим. Відомий своїми архітектурними пам\'ятками, зокрема Спасо-Преображенським собором та Альтанкою.',
    descriptionEn: 'The regional center on the Psel River. Founded in 1655 by Colonel Gerasym Kondratiev. Known for its architectural monuments, in particular the Transfiguration Cathedral and Altanka.',
    population: '260,000'
  },
  {
    id: 'konotop',
    name: 'Конотоп',
    nameEn: 'Konotop',
    lat: 51.2413,
    lng: 33.2031,
    type: 'city',
    description: 'Місто козацької слави, де у 1659 році відбулася славетна Конотопська битва. Відоме також своєю унікальною трамвайною системою (одна з найменших міст з трамваєм в Україні).',
    descriptionEn: 'City of Cossack glory, where the famous Battle of Konotop took place in 1659. Also known for its unique tram system (one of the smallest cities with a tram in Ukraine).',
    population: '85,000'
  },
  {
    id: 'shostka',
    name: 'Шостка',
    nameEn: 'Shostka',
    lat: 51.8630,
    lng: 33.4832,
    type: 'city',
    description: 'Важливий промисловий та культурний центр північної Сумщини, історично відомий виробництвом кіноплівки ("Свема") та пороху.',
    descriptionEn: 'Important industrial and cultural center of northern Sumy region, historically famous for film production ("Svema") and gunpowder factory.',
    population: '73,000'
  },
  {
    id: 'romny',
    name: 'Ромни',
    nameEn: 'Romny',
    lat: 50.7510,
    lng: 33.4747,
    type: 'city',
    description: 'Стародавнє місто на річці Сула, згадуване ще у "Повчанні" Володимира Мономаха (1096 р.). Відоме як значний ярмарковий центр Лівобережжя та пам\'ятником Петру Калнишевському.',
    descriptionEn: 'An ancient town on the Sula River, mentioned in Vladimir Monomakh\'s "Instruction" (1096). Known as a major fair center and for the monument to Petro Kalnyshevsky.',
    population: '38,000'
  },
  {
    id: 'okhtyrka',
    name: 'Охтирка',
    nameEn: 'Okhtyrka',
    lat: 50.3122,
    lng: 34.8994,
    type: 'city',
    description: 'Місто-герой України. Історичний козацький центр Слобожанщини, відомий своєю нафтогазовою промисловістю, а також величним Покровським собором, зведеним за проектом Растреллі.',
    descriptionEn: 'Hero City of Ukraine. Historical Cossack center of Slobozhanshchyna, known for its oil and gas industry, as well as the majestic Intercession Cathedral designed by Rastrelli.',
    population: '47,000'
  },
  {
    id: 'hlukhiv',
    name: 'Глухів',
    nameEn: 'Hlukhiv',
    lat: 51.6761,
    lng: 33.9103,
    type: 'historical',
    description: 'Одне з найстаріших міст України. У 1708-1782 роках — столиця Гетьманщини та резиденція останніх українських гетьманів (І. Скоропадського, Д. Апостола, К. Розумовського).',
    descriptionEn: 'One of the oldest towns in Ukraine. In 1708-1782, it was the capital of the Cossack Hetmanate and the residence of the last Ukrainian hetmans.',
    population: '32,000'
  },
  {
    id: 'trostianets',
    name: 'Тростянець',
    nameEn: 'Trostianets',
    lat: 50.4735,
    lng: 34.9688,
    type: 'historical',
    description: 'Мальовниче місто, відоме унікальною пам\'яткою архітектури XVIII ст. "Круглий двір" (колишній манеж та театр), палацом Голіцина-Кеніга та дендропарком "Нескучне".',
    descriptionEn: 'A picturesque town known for its unique 18th-century architectural monument "Round Yard", the Galitzine-Koenig Palace, and "Neskuchne" arboretum.',
    population: '20,000'
  },
  {
    id: 'krolevets',
    name: 'Кролевець',
    nameEn: 'Krolevets',
    lat: 51.5514,
    lng: 33.3797,
    type: 'historical',
    description: 'Місто, засноване у 1601 році. Всесвітньо відоме своїми унікальними червоно-білими кролевецькими тканими рушниками та ботанічною пам\'яткою природи "Яблуня-колонія" (вік понад 220 років).',
    descriptionEn: 'Town founded in 1601. World-famous for its unique red-and-white woven Krolevets towels and the unique botanical monument "Apple Tree Colony" (over 220 years old).',
    population: '22,000'
  },
  {
    id: 'lebedyn',
    name: 'Лебедин',
    nameEn: 'Lebedyn',
    lat: 50.5822,
    lng: 34.4782,
    type: 'city',
    description: 'Історичне козацьке місто Слобожанщини, засноване у 1654 році. Відоме своїм художнім музеєм ім. Б. Руднєва та озером Лебедин у центрі міста.',
    descriptionEn: 'Historical Cossack town of Slobozhanshchyna, founded in 1654. Known for its Art Museum and Lebedyn Lake in the center of the town.',
    population: '24,000'
  },
  {
    id: 'putyvl',
    name: 'Путивль',
    nameEn: 'Putyvl',
    lat: 51.3283,
    lng: 33.8647,
    type: 'historical',
    description: 'Давньоруське місто, відоме за "Словом о полку Ігоревім" (саме на стінах Путивля плакала Ярославна). Тут розташований величний Молчанський монастир.',
    descriptionEn: 'Ancient Rus town, famous for the epic poem "The Tale of Igor\'s Campaign" (where Yaroslavna lamented on the walls of Putyvl). Home to the majestic Molchansky Monastery.',
    population: '15,000'
  }
];

// Sumy Oblast bounding box: Min Lat 50.1, Min Lon 33.1, Max Lat 52.4, Max Lon 35.7
export const sumyBbox = {
  minLat: 50.1,
  minLng: 33.1,
  maxLat: 52.4,
  maxLng: 35.7
};
