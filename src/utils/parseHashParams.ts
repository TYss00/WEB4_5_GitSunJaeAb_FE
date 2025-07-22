export const parseHashParams = (hash: string): Record<string, string> => {
  if (!hash.startsWith('#')) return {};

  return hash
    .substring(1)
    .split('&')
    .map((pair) => pair.split('='))
    .reduce((acc, [key, value]) => {
      if (key && value) acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);
};
