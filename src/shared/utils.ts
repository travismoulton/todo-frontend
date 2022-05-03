export const utils = {
  generateDateStr: function (date: Date) {
    return +[date.getFullYear(), date.getMonth(), date.getDate()].join('');
  },
};
