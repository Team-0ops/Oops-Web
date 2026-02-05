export const formatYYMD = (isoString: string) => {
  const d = new Date(isoString);

  return `${String(d.getFullYear()).slice(2)}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};
