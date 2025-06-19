import { useState } from "react";

function App() {
  const [bill, setBill] = useState("0.00");
  const tip = bill ? parseFloat(bill) * 0.2 : 0; // 15% tip
  const total = bill ? parseFloat(bill) + tip : 0;
  function formatToMoneyFromDigits(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value;
    console.log(digits);
    // Remove non-digit characters
    const clean = digits.replace(/\D/g, "");

    // Treat as cents
    const cents = clean.padStart(3, "0"); // Ensure at least 3 digits

    const dollars = (parseInt(cents, 10) / 100).toFixed(2);
    setBill(dollars);
  }

  const moneyFormat = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  return (
    <>
      <div className="flex items-center flex-col justify-center h-screen bg-gradient-to-br from-cyan-500 to-cyan-700 text-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="">Tip Calculator</h1>
          <h2 className="text-6xl">{moneyFormat(tip)}</h2>
          <p>Total Payment {moneyFormat(total)}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-3xl">
          <form action="">
            <div className="flex flex-row gap-4 mb-4">
              <label htmlFor="bill" className="block text-sm mb-2">
                Bill Amount
              </label>
              <input
                type="text"
                id="bill"
                inputMode="numeric"
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                placeholder="Enter bill amount"
                value={bill}
                onChange={formatToMoneyFromDigits}
              />
            </div>
          </form>
          <button
            className="mt-4 p-2 bg-red-500 rounded-lg"
            onClick={() => setBill("0.00")}
          >
            clear
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
