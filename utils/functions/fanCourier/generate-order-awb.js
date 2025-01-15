import { banca, iban } from "@/utils/settings";
import { getFanCourierToken } from "./generate-token";

const generateOrderAWB = async (orderData) => {
  const authToken = await getFanCourierToken();

  const parcelDimensionsObj = {
    length: parseInt(orderData.parcelDimensions.match(/L: (\d+)/)[1], 10),
    width: parseInt(orderData.parcelDimensions.match(/W: (\d+)/)[1], 10),
    height: parseInt(orderData.parcelDimensions.match(/H: (\d+)/)[1], 10),
  };

  const awbData = {
    clientId: process.env.FAN_CLIENT_ID,
    shipments: [
      {
        info: {
          service:
            orderData.paymentMethod === "ramburs"
              ? "Cont Colector"
              : "Standard",
          bank: orderData.paymentMethod === "ramburs" ? banca : null,
          bankAccount: orderData.paymentMethod === "ramburs" ? iban : null,
          packages: { parcel: 1, envelope: 0 },
          weight: orderData.totalWeight,
          cod: orderData.paymentMethod === "ramburs" ? orderData.totalCost : 0,
          declaredValue: orderData.productsCost,
          payment:
            orderData.paymentMethod === "ramburs" ? "destinatar" : "expeditor",
          dimensions: parcelDimensionsObj,
        },
        recipient: {
          name: `${orderData.shippingFirstName} ${orderData.shippingLastName}`,
          contactPerson: `${orderData.shippingFirstName} ${orderData.shippingLastName}`,
          phone: orderData.shippingPhone,
          email: orderData.shippingEmail,
          address: {
            county: orderData.shippingCounty,
            locality: orderData.shippingLocality,
            street: orderData.shippingStreet,
            streetNo: orderData.shippingStreetNo,
            zipCode: orderData.shippingZipCode,
            building: orderData.shippingBuilding,
            entrance: orderData.shippingEntrance,
            floor: orderData.shippingFloor,
            apartment: orderData.shippingApartment,
          },
        },
      },
    ],
  };

  const awbResponse = await fetch("https://api.fancourier.ro/intern-awb", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(awbData),
  });

  if (!awbResponse.ok) {
    throw new Error("Failed to create AWB");
  }

  return awbResponse.json();
};

export default generateOrderAWB;
