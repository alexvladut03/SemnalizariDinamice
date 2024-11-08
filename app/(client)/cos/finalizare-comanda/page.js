import { getCounties } from "@/utils/functions/shipping/get-counties";
import { getLocalities } from "@/utils/functions/shipping/get-localities";
import OrderDetailsBillingPaymentSummary from "./_components/OrderDetailsBillingPaymentSummary";

const Page = async () => {
  const counties = await getCounties();
  const countrieswithLocalities = await Promise.all(
    counties.map(async (county) => {
      const localities = await getLocalities(county.name);
      return {
        county: county.name,
        localities: localities.map((locality) => locality.name),
      };
    })
  );

  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <OrderDetailsBillingPaymentSummary
        countrieswithLocalities={countrieswithLocalities}
      />
    </div>
  );
};

export default Page;
