export type PredictionOption = {
  id: number;
  name: string;
  img: string;
};

export type PredictionItem = {
  code: string;
  title: string;
  subTitle: string;
  ipfs: string;
  answer: PredictionOption;
  options: PredictionOption[];
};

export const predictions: Record<string, PredictionItem> = {
  QmZ6vNrRZERBa1Ze8pzH96vZAt8txFTeRi8Vbz2aNu5JWE: {
    code: 'wc2006',
    title: 'The Champion',
    subTitle: 'Which country won the World Cup in 2006?',
    ipfs: 'ipfs://QmZ6vNrRZERBa1Ze8pzH96vZAt8txFTeRi8Vbz2aNu5JWE',
    answer: {
      id: 1,
      name: 'Italy',
      img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/italy.jpg',
    },
    options: [
      {
        id: 2,
        name: 'France',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/france.jpg',
      },
      {
        id: 3,
        name: 'Germany',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/germany.jpg',
      },
      {
        id: 1,
        name: 'Italy',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/italy.jpg',
      },
      {
        id: 4,
        name: 'Portugal',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/portugal.jpg',
      },
    ],
  },
  QmUtJ6Bzx1NM6jYUcqHWgx6GpyAds9xwXBxRVhoR94y5US: {
    code: 'wc2010',
    title: 'The Champion',
    subTitle: 'Which country won the World Cup in 2010?',
    ipfs: 'ipfs://QmUtJ6Bzx1NM6jYUcqHWgx6GpyAds9xwXBxRVhoR94y5US',
    answer: {
      id: 1,
      name: 'Spain',
      img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/spain.jpg',
    },
    options: [
      {
        id: 2,
        name: 'Uruguay',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/uruguay.jpg',
      },
      {
        id: 3,
        name: 'Germany',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/germany.jpg',
      },
      {
        id: 4,
        name: 'Netherlands',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/netherlands.jpg',
      },
      {
        id: 1,
        name: 'Spain',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/spain.jpg',
      },
    ],
  },
  QmZYeu8jVa3hVh1x4GdTMKauM1MgxVGq2JoXJF1aRMEyAk: {
    code: 'wc2014',
    title: 'The Champion',
    subTitle: 'Which country won the World Cup in 2014?',
    ipfs: 'ipfs://QmZYeu8jVa3hVh1x4GdTMKauM1MgxVGq2JoXJF1aRMEyAk',
    answer: {
      id: 1,
      name: 'Germany',
      img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/germany.jpg',
    },
    options: [
      {
        id: 1,
        name: 'Germany',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/germany.jpg',
      },
      {
        id: 2,
        name: 'Brazil',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/brazil.jpg',
      },
      {
        id: 4,
        name: 'Argentina',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/argentina.jpg',
      },
      {
        id: 3,
        name: 'Netherlands',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/netherlands.jpg',
      },
    ],
  },
  QmQ1B4xVVeeQCBbupNGewPZRvjiR5kZ1n3vD19BBiMKxma: {
    code: 'wc2018',
    title: 'The Champion',
    subTitle: 'Which country won the World Cup in 2018?',
    ipfs: 'ipfs://QmQ1B4xVVeeQCBbupNGewPZRvjiR5kZ1n3vD19BBiMKxma',
    answer: {
      id: 1,
      name: 'France',
      img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/france.jpg',
    },
    options: [
      {
        id: 2,
        name: 'Croatia',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/croatia.jpg',
      },
      {
        id: 1,
        name: 'France',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/france.jpg',
      },
      {
        id: 3,
        name: 'Belgium',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/belgium.jpg',
      },
      {
        id: 4,
        name: 'England',
        img: 'https://cdn1.p12.games/collabs/bnbchain-football-fiesta/options/england.jpg',
      },
    ],
  },
};
