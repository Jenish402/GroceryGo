import React, { useState } from "react";

function PaymentMethods() {
  // Define state for selectedMethod
  const [selectedMethod, setSelectedMethod] = useState(null);

  // Handle the continue action (you can replace with your logic)
  const handleContinue = () => {
    console.log("Selected Payment Method: ", selectedMethod);
    // Your continue logic here
  };

  return (
    <>
      <div className="p-[50px]">
      <div className="space-y-4  ">
        <div
          className={`border p-4 rounded-lg cursor-pointer ${
            selectedMethod === "stripe"
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          }`}
          onClick={() => setSelectedMethod("stripe")}
        >
          <h2 className="text-lg font-semibold">
            Online Payment (Card / UPI via Stripe)
          </h2>
          <p className="text-sm text-gray-600">Secure payment through Stripe</p>
        </div>

        <div
          className={`border p-4 rounded-lg cursor-pointer ${
            selectedMethod === "cod"
              ? "border-green-500 bg-green-50"
              : "border-gray-300"
          }`}
          onClick={() => setSelectedMethod("cod")}
        >
          <h2 className="text-lg font-semibold">Cash on Delivery</h2>
          <p className="text-sm text-gray-600">
            Pay in cash when your groceries are delivered
          </p>
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
      >
        Continue
      </button>
      </div>
    </>
  );
}

export default PaymentMethods;
