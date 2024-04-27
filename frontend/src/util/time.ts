export const secondToText = (second: number) => {
  if (second < 3600) {
    return new Date(second * 1000).toISOString().slice(14, 19);
  }
  return new Date(second * 1000).toISOString().slice(11, 19);
};
