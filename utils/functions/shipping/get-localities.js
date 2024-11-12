export const getLocalities = async (countyName) => {
  const response = await fetch(
    `https://api.fancourier.ro/reports/localities?county=${countyName}`
  );
  const data = await response.json();

  if (!response.ok) throw new Error("Nu s-au putut încărca localitățile");

  return data.data;
};
