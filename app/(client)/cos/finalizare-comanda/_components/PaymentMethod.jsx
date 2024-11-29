import React from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { Loader2 } from "lucide-react";

const PaymentMethod = ({ paymentMethod, setPaymentMethod, form }) => {
  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
    form.setValue("paymentMethod", value, { shouldValidate: true });
  };

  return (
    <div>
      <div className="flex text-xl font-medium pb-4">
        <div className="bg-amber-500 w-7 h-7 rounded-full flex justify-center text-white">
          3
        </div>
        <h2 className="pl-4">Plată</h2>
      </div>

      {/* Credit Card Option */}
      <div
        className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 mb-5 ${
          paymentMethod === "card" ? "border-amber-500 bg-orange-50" : ""
        }`}
        onClick={() => handlePaymentMethodChange("card")}
      >
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            paymentMethod === "card" ? "border-amber-500" : "border-gray-300"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              paymentMethod === "card" ? "bg-amber-500" : "bg-transparent"
            }`}
          />
        </div>

        <span
          className={`font-bold ${
            paymentMethod === "card" ? "text-amber-500" : "text-gray-500"
          }`}
        >
          <div>Card de credit</div>
          <div className="text-sm text-gray-900">
            Plătești imediat, fără costuri suplimentare.
          </div>
        </span>
        <FaCcVisa className="text-blue-500 text-5xl text-end flex justify-end" />
        <FaCcMastercard className="text-yellow-400 text-5xl text-end flex justify-end" />
      </div>

      {/* Cash on Delivery Option */}
      <div
        className={`flex items-center gap-4 border rounded-lg p-4 w-full cursor-pointer transition-colors duration-500 ${
          paymentMethod === "ramburs" ? "border-amber-500 bg-orange-50" : ""
        }`}
        onClick={() => handlePaymentMethodChange("ramburs")}
      >
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            paymentMethod === "ramburs" ? "border-amber-500" : "border-gray-300"
          }`}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              paymentMethod === "ramburs" ? "bg-amber-500" : "bg-transparent"
            }`}
          />
        </div>

        <span
          className={`font-bold ${
            paymentMethod === "ramburs" ? "text-amber-500" : "text-gray-500"
          }`}
        >
          <div>Ramburs la curier</div>
          <div className="text-sm text-gray-900">
            Vei plăti în momentul în care comanda va fi livrată.
          </div>
          <div className="text-sm text-gray-700">
            5 Lei reprezintă costul pentru procesarea plății la livrare. Plata
            online cu cardul este gratuită.
          </div>
        </span>
      </div>

      <input type="hidden" {...form.register("paymentMethod")} />
    </div>
  );
};

export default PaymentMethod;
