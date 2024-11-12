export const generateToken = async () => {
  const response = await fetch(
    "https://sameday-api.demo.zitec.com/api/authenticate",
    {
      next: {
        revalidate: 43200,
      },
      method: "POST",
      headers: {
        "X-AUTH-USERNAME": process.env.SAMEDAY_USERNAME,
        "X-AUTH-PASSWORD": process.env.SAMEDAY_PASSWORD,
      },
    }
  );
  const data = await response.json();
  return data.token;
};
