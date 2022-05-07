export const utils = {
  generateDateStr: function (date: Date) {
    return +date.toISOString().substring(0, 10).split('-').join('');
  },
};
