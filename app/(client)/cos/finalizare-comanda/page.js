import { generateToken } from "@/utils/actions/sameday/generate-token";
import getCountries from "@/utils/functions/shipping/get-countries";
import { getLocalities } from "@/utils/functions/shipping/get-localities";
import React from "react";

const page = async () => {
  const counties = await getCountries();

  const countiesWithLocalities = await Promise.all(
    counties.map(async (county) => {
      const localities = await getLocalities(county.name);
      return {
        county: county.name,
        localities: localities.map((locality) => locality.name),
      };
    })
  );

  const token = await generateToken();

  return <div>{token}</div>;
};

export default page;
