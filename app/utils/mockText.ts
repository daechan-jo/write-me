interface Article {
  id: string;
  date: string;
  content: string;
  bookMark: boolean;
}

const articles: Article[] = [
  {
    id: '1',
    date: 'March 7',
    content: '내 꿈은 너야 연진아.',
    bookMark: true,
  },
  {
    id: '2',
    date: 'March 6',
    content:
      '그러다 깨달았지.\n' +
      '신은 있는게 아니라 있는 척한다는 걸.\n' +
      '그러니까 넌 나에게 빌어야 해 연진아.\n' +
      '너의 구원은 나에게 있거든.',
    bookMark: false,
  },
  {
    id: '3',
    date: 'February 27',
    content:
      '오늘부터 모든 날이 흉흉할거야.\n' +
      '자극적이고 끔질 할 거야.\n' +
      '막을 수도 없앨 수도 없을 거야.\n' +
      '나는 너의 아주 오래된 소문이 될 거거든.\n' +
      '난 거기까지 가볼 작정이야.\n' +
      '연진아, 용서는 없어.\n' +
      '그래도 그 어떤 영광도 없겠지만..',
    bookMark: true,
  },
  {
    id: '4',
    date: 'January 4',
    content:
      '매일 생각했어 연진아.\n' +
      '난 너를 어디서 재회해야 할까.\n' +
      '모든 것을 다 가진 네가\n' +
      '세상 누구도 두렵지 않을 네가\n' +
      '순간이나마 내가 두려울 곳은 과연 어딜까?\n' +
      '아무리 생각해도 거기뿐이라\n' +
      '60 제곱미터의 나만의 체육관 말이야',
    bookMark: false,
  },

  {
    id: '5',
    date: 'December 31',
    content:
      '그래서 넌 다 이뤘어?\n' +
      '적당히 고급진 직업은 가진거 같고\n' +
      '조건 좋은 남자와 가장 예쁠 때 결혼하고\n' +
      '행복하게 살고 있어?\n' +
      '넌 해냈을거야 그치, 박연진?',
    bookMark: false,
  },
];

export default articles;
