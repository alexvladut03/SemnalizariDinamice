"use client";
import React, { useState } from "react";
import { FaFilePdf, FaPaperPlane } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Page() {
  const [date, setDate] = useState("");
  const [awbReport, setAwbReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAwbReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/fanCourier/createAWB", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "getAWBReport",
          clientData: { date, perPage: 5, page: 1 },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AWB report");
      }

      const data = await response.json();
      setAwbReport(data.data.data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchOrderReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/fanCourier/createAWB", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "getOrderReport",
          clientData: { date, perPage: 5, page: 1 },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AWB report");
      }
      const data = await response.json();
      console.log("order report", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeteleAWB = async (awbNumber) => {
    try {
      const response = await fetch(`/api/fanCourier/createAWB`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "deleteAWB",
          clientData: awbNumber, // AWB-ul specific
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete AWB");
      }

      const deleteData = await response.json();
      console.log("AWB deleted successfully:", deleteData);

      // Actualizează lista pentru a elimina AWB-ul șters
      setAwbReport((prev) =>
        prev.filter((awb) => awb.info.awbNumber !== awbNumber)
      );
    } catch (err) {
      setError(err.message);
      console.error("Error deleting AWB:", err);
    }
  };

  const fetchPrintAWB = async (awbNumber) => {
    try {
      const response = await fetch(`/api/fanCourier/createAWB`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "printAWB",
          clientData: awbNumber, // AWB-ul specific
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to print AWB");
      }

      // Transformăm răspunsul în blob (pentru PDF)
      const pdfBlob = await response.blob();

      // Creăm un URL temporar pentru fișierul PDF și deschidem descărcarea
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `AWB-${awbNumber}.pdf`; // Numele fișierului descărcat
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      console.log("AWB printed successfully");
    } catch (err) {
      setError(err.message);
      console.error("Error printing AWB:", err);
    }
  };

  const fetchSendAWB = async (awb) => {
    try {
      // Structura datelor pentru endpoint-ul de trimitere a comenzii curier
      const sendAWBData = {
        clientId: 7276517, // ID-ul clientului, înlocuiește cu ID-ul tău
        info: {
          orderType: awb.info.service, // tipul de comandă
          packages: {
            parcel: awb.info.packages.parcel, // numărul de colete
            envelope: awb.info.packages.envelope, // numărul de plicuri
          },
          weight: awb.info.weight, // greutatea totală
          dimensions: {
            width: awb.info.dimensions.width, // lățimea coletului
            length: awb.info.dimensions.length, // lungimea coletului
            height: awb.info.dimensions.height, // înălțimea coletului
          },
          pickupDate: "2024-12-12", // data ridicării pentru test
          pickupHours: {
            first: "09:00", // ora de început
            second: "16:00", // ora de sfârșit
          },
        },
        // Datele destinatarului sunt necesare doar pentru comenzile "Express Loco"
        // În acest caz, le ignorăm pentru comanda de tip "Standard"
      };

      const sendOrderURL = "/api/fanCourier/createAWB"; // Endpoint-ul pentru trimiterea comenzii

      // Trimiterea cererii către endpoint
      const sendOrderResponse = await fetch(sendOrderURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendOrder",
          sendAWBData,
        }),
      });

      if (!sendOrderResponse.ok) {
        const sendOrderError = await sendOrderResponse.text();
        console.error("Error sending order:", sendOrderError);
        setError("Failed to send order for AWB " + awb.info.awbNumber);
        return;
      }

      const sendData = await sendOrderResponse.json();
      console.log(
        "Order sent successfully for AWB:",
        awb.info.awbNumber,
        sendData
      );
    } catch (error) {
      console.error("Network error while sending order for AWB:", error);
      setError("Network error occurred for AWB " + awb.info.awbNumber);
    }
  };
  const fetchDeleteOrder = async () => {
    const staticOrderId = 20915470; // ID-ul comenzii pentru test

    try {
      const response = await fetch(`/api/fanCourier/createAWB`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "deleteOrder",
          clientData: { orderId: staticOrderId },
        }),
      });

      if (!response.ok) {
        const deleteOrderError = await response.json();
        if (deleteOrderError.message.includes("already deleted")) {
          console.log("Comanda a fost deja ștearsă.");
          setError("Această comandă a fost deja ștearsă.");
        } else {
          console.error("Error deleting order:", deleteOrderError);
          setError("Failed to delete order with Fan Courier");
        }
        return;
      }

      console.log("Order deleted successfully:", staticOrderId);
    } catch (err) {
      console.error("Network error while deleting order:", err);
      setError("Network error occurred while deleting order");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        Raport AWB pentru o zi specifică
      </h1>
      <div className="mb-4">
        <label className="block text-gray-700">Selectează data:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={fetchAwbReport}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!date || loading}
      >
        {loading ? "Se încarcă..." : "Afișează raportul AWB"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {awbReport && awbReport.length > 0 && (
        <div className="mt-6 overflow-x-auto border-2 border-gray-300 rounded-lg">
          <div className="min-w-max ">
            <div className="flex w-full bg-gray-100 rounded-t-lg border-b-4 border-gray-300">
              <div className="w-48 flex-shrink-0 font-bold py-4 text-center border-r-4 border-gray-300 sticky left-0 bg-gray-200 z-20">
                AWB
              </div>
              <div className="flex-1 flex overflow-x-auto">
                <div className="w-48 font-bold text-center py-4">
                  Destinatar
                </div>
                <div className="w-48 font-bold text-center py-4">
                  Numar de telefon
                </div>
                <div className="w-48 font-bold text-center py-4">
                  Tip Serviciu
                </div>
                <div className="w-48 font-bold text-center py-4">
                  Data comenzii
                </div>
                <div className="w-48 font-bold text-center py-4">
                  Valoare ramburs
                </div>
                <div className="w-48 font-bold text-center py-4">
                  Valoare declarata
                </div>
                <div className="w-48 font-bold text-center py-4">
                  Dimensiuni
                </div>
                <div className="w-48 font-bold text-center py-4">
                  Cine plateste
                </div>
                <div className="w-48 font-bold text-center py-4">Judet</div>
                <div className="w-48 font-bold text-center py-4">
                  Localitate
                </div>
              </div>
              <div className="w-48 flex-shrink-0 font-bold text-center border-l-4 border-gray-300 sticky right-0 py-4 bg-gray-200 z-20">
                Actiuni
              </div>
            </div>
            {awbReport.map((awb, index) => (
              <div
                key={index}
                className="flex w-full bg-white hover:bg-gray-100"
              >
                <div className="w-48 flex-shrink-0 text-center bg-white py-4 border-r-4  border-gray-300 sticky left-0 z-20">
                  {awb.info.awbNumber}
                </div>
                <div className="flex-1 flex overflow-x-auto">
                  <div className="w-48 text-center py-4">
                    {awb.recipient.name}
                  </div>
                  <div className="w-48 text-center py-4">
                    {awb.recipient.phone || "N/A"}
                  </div>
                  <div className="w-48 text-center py-4">
                    {awb.info.service}
                  </div>
                  <div className="w-48 text-center py-4">{awb.info.date}</div>
                  <div className="w-48 text-center py-4">{awb.info.cod}</div>
                  <div className="w-48 text-center py-4">
                    {awb.info.declaredValue}
                  </div>
                  <div className="w-48 text-center py-4">
                    {awb.info.dimensions.height} x {awb.info.dimensions.width} x{" "}
                    {awb.info.dimensions.length} cm
                  </div>
                  <div className="w-48 text-center py-4">
                    {awb.info.payment}
                  </div>
                  <div className="w-48 text-center py-4">
                    {awb.recipient.address.county}
                  </div>
                  <div className="w-48 text-center py-4">
                    {awb.recipient.address.locality}
                  </div>
                </div>
                <div className="flex w-48 gap-6 flex-shrink-0 text-center bg-white py-4 border-l-4 border-gray-300 sticky right-0 z-20 items-center">
                  <button
                    onClick={() => fetchDeteleAWB(awb.info.awbNumber)} // Funcție anonimă pentru a trimite AWB-ul specific
                    className="text-red-500 text-3xl "
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => fetchPrintAWB(awb.info.awbNumber)}
                    className="text-yellow-400 text-2xl "
                  >
                    <FaFilePdf />
                  </button>
                  <button
                    onClick={() => fetchSendAWB(awb)}
                    className="text-green-500 text-2xl"
                  >
                    <FaPaperPlane />
                  </button>
                  <button
                    onClick={() => fetchDeleteOrder(awb.info.orderId)} // Trimitem ID-ul comenzii pentru ștergere
                    className="text-red-500 text-2xl"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={fetchOrderReport}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mx-4"
      >
        GETORDERDATA / fetchOrderReport
      </button>
    </div>
  );
}
