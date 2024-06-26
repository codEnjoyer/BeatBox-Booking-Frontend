export const studios = [
  {
    name: 'Tema studio',
    image: 'https://www.funnyart.club/uploads/posts/2022-02/1644887147_47-www-funnyart-club-p-fon-muzikalnaya-studiya-krasivo-63.jpg',
    description: 'Студия с акцентом на качество звукоизоляции',
    average_grade: '4.0',
    opening_at: '10:00',
    closing_at: '22:00',
    id: 1,
    options: `Кардан — 50 ₽
        Тарелки — 50 ₽
        Другие инструменты — 50 ₽`,
    phone: '+7 (999) 999-99-99',
    telegram: '@temasaur',
    rooms: [
      {
        name: 'Studio 1',
        price: 300,
        image: 'https://avatars.mds.yandex.net/get-altay/4255939/2a00000182bc645d41cc85c85485e7f11218/orig',
        description: 'Красивая комната и конкурсы интересные',
        id: 1,
      },
      {
        name: 'Studio 2',
        price: 900,
        image: 'https://avatars.mds.yandex.net/get-altay/2809325/2a00000174112d0ca99d1dbbbf6d44bf42eb/orig',
        description: 'Здесь записывались Мэйби Бэйби и Дора',
        id: 2,
      }
    ],
    reviews: [
      {
        grade: 4,
        text: 'Очень красивая студия, музыканты очень красивые',
        room: 'Studio 1',
      },
      {
        grade: 5,
        text: 'Крутая студия, звук хороший, помещения просторные и удобные спасибо создателю сайта за такой удобный сайт',
        room: 'Studio 1',
      },
      {
        grade: 3,
        text: 'А мне показалось, что студия пахнет солеными огурцами, а я не люблю соленые огурцы, но сайт крутой поэтому плюс три балла',
        room: 'Studio 2',
      }
    ]
  },
  {
    name: 'Tema studio 2',
    image: 'https://styledejouy.ru/images/myz-study-import/37.jpg',
    description: 'Лучшие инструменты в городе',
    average_grade: '3.8',
    opening_at: '11:00',
    closing_at: '22:00',
    id: 2,

    options: `Тарелки — 50 ₽
        Инструменты — 50 ₽`,
    phone: '+7 (999) 999-99-99',
    telegram: '@temasaur',
    website: 'https://temasaur.ru',
    rooms: [
      {
        name: 'Studio',
        price: 350,
        image: 'https://i.pinimg.com/originals/c4/bf/b2/c4bfb22de1f23841c83fc3023930fd88.png',
        description: 'Просторная студия со всеми плюшками',
        id: 3,
      },
    ],
    reviews: [
      {
        grade: 3,
        text: 'Студия отличная, но звукоизоляция могла быть получше',
        room: 'Studio',
      },
      {
        grade: 4,
        text: 'Отличный сервис, но могли бы предложить больше вариантов аранжировок',
        room: 'Studio',
      },
      {
        grade: 4,
        text: 'Удобное расположение, но качество звука могло быть выше',
        room: 'Studio',
      },
      {
        grade: 4,
        text: 'Удобное расписание, но могли бы предлагать больше скидок для студентов',
        room: 'Studio',
      }
    ]
  },
  {
    name: 'Другая студия',
    image: 'https://www.repal.ru/image/roomsphoto/018fd0ee5b8726081faf23154af32e96.jpg',
    description: 'Студия для гитаристов и басистов',
    average_grade: '4.6',
    opening_at: '8:00',
    closing_at: '0:00',
    id: 3,
    options: `Тарелки — 50 ₽
        Инструменты — 50 ₽`,
    phone: '+7 (999) 999-99-99',
    whatsapp: '@temasaur',
    rooms: [
      {
        name: 'Синяя комната',
        price: 350,
        image: 'https://rusinfo.info/wp-content/uploads/0/2/e/02ea28b04247fba2ca8a804b1762ccbc.jpg',
        id: 4,
      },
      {
        name: 'Деревянная комната',
        price: 400,
        image: 'https://soundex.ru/forum/uploads/monthly_2019_02/32C9C9CA-971E-4C45-9E6A-01FF313B011E.jpeg.857b8aceccf9f78df9f75d9b8eacfef2.jpeg',
        id: 5,
      },
      {
        name: 'Цветная комната',
        price: 300,
        image: 'https://sun9-58.userapi.com/impg/oNMWnUFoJyOlL1DAHfmtk5CjIi73Iog-tnoM_g/H3XjAFgaJls.jpg?size=807x500&quality=96&sign=2bafc177651f1038803f07dcdd9fc370&c_uniq_tag=Lpo9zjztWaU4cvlEZy1JFFxn7VNBJUT1GwTXR_C6cNs&type=album',
        id: 6,
      },
      {
        name: 'Малая комната',
        price: 200,
        image: 'https://bogatyr.club/uploads/posts/2023-02/thumbs/1677606772_bogatyr-club-p-pomeshchenie-dlya-repetitsii-foni-krasivo-83.jpg',
        id: 7,
      },
    ],
    reviews: [
      {
        grade: 5,
        text: 'Прекрасный интерьер, создаёт атмосферу творчества',
        room: 'Малая комната',
      },
      {
        grade: 4,
        text: 'Отличное соотношение цены и качества, но можно было бы добавить больше видов услуг',
        room: 'Синяя комната',
      },
      {
        grade: 5,
        text: 'Регулярные обновления и улучшения, студия становится лучше',
        room: 'Деревянная комната',
      },
      {
        grade: 4,
        text: 'Прекрасный интерьер, но хотелось бы больше света в помещении',
        room: 'Синяя комната',
      },
      {
        grade: 5,
        text: 'Прекрасное место для записи. Отличный сервис. Удобное время работы',
        room: 'Синяя комната',
      }
    ]
  },
  {
    name: 'Studio the studio',
    image: 'https://i.pinimg.com/originals/b3/2b/aa/b32baa52ceefbbee3a23e37912a139e3.jpg',
    description: 'Студия для всех-всех',
    opening_at: '8:00',
    closing_at: '23:00',
    id: 4,

    phone: '+7 (999) 999-99-99',
    whatsapp: '@temasaur',
    rooms: [
      {
        name: 'Дешевая комната',
        price: 150,
        image: 'https://colodu.club/uploads/posts/2022-10/1666213926_24-colodu-club-p-muzikalnaya-komnata-dizain-oboi-27.jpg',
        description: 'Тесная комната для всех',
        id: 8,
      },
      {
        name: 'Дорогая комната',
        price: 900,
        image: 'https://www.politusic.com/wp-content/uploads/2013/11/drums-in-larg-room-sonic-ranch-studio.jpg',
        description: 'Просторная комната для всех',
        id: 9,
      },
    ],
  }
]