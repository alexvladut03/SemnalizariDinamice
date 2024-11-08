export const getCounties = async () => {
  const response = await fetch("https://api.fancourier.ro/reports/counties", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Esuat la obținerea județelor");
  }
  return data.data;
};
