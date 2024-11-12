const getCountries = async () => {
  const response = await fetch("https://api.fancourier.ro/reports/counties");
  const data = await response.json();

  if (!response.ok) throw new Error("Nu s-au putut încărca județele");

  return data.data;
};

export default getCountries;
