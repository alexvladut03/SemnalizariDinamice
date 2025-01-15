import prisma from "@/utils/prisma";

export const getSamedayToken = async () => {
  // Fetch the token from the database
  let tokenRecord = await prisma.token.findFirst({
    where: {
      service: "Sameday",
    },
  });

  const currentTime = new Date();

  // If the token exists and has not expired, return it
  if (tokenRecord && tokenRecord.expiresAt > currentTime) {
    return tokenRecord.token;
  }

  // Otherwise, fetch a new token
  const response = await fetch(
    "https://sameday-api.demo.zitec.com/api/authenticate",
    {
      method: "POST",
      headers: {
        "X-AUTH-USERNAME": process.env.SAMEDAY_USERNAME,
        "X-AUTH-PASSWORD": process.env.SAMEDAY_PASSWORD,
      },
      cache: "no-store",
    }
  );

  // Check if the response is not okay (e.g., 400 or 500 status codes)
  if (!response.ok) {
    const errorMessage = `Error ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();

  // Validate that the token exists in the response
  if (!data?.token) {
    throw new Error("Token not received from Sameday");
  }

  const expiresAtISO = new Date(data.data.expiresAt).toISOString();

  if (tokenRecord) {
    tokenRecord = await prisma.token.update({
      where: {
        id: tokenRecord.id,
      },
      data: {
        token: data.data.token,
        expiresAt: expiresAtISO,
      },
    });
  } else {
    tokenRecord = await prisma.token.create({
      data: {
        service: "FanCourier",
        token: data.data.token,
        expiresAt: expiresAtISO,
      },
    });
  }

  console.log("returned token", tokenRecord.token);

  return tokenRecord.token;
};
