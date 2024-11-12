export const getLocalities = async (county) => {
  const response = await fetch(
    `https://api.fancourier.ro/reports/localities?county=${county}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Esuat la obținerea localităților");
  }
  return data.data;
};
