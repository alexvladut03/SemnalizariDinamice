import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      "order-number": 1,
      "client-name": "John Doe",
      "client-phone": "0740123456",
      date: "2024-01-01",
      "order-status": "pending",
      "order-total": 100,
      "order-shipping-method": "Express",
      "order-payment-method": "Credit Card",
      "order-actions": "View",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
