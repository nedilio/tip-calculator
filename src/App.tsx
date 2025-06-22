import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function App() {
  const [bill, setBill] = useState("0.00");
  const tip = bill ? parseFloat(bill) * 0.2 : 0;
  const total = bill ? parseFloat(bill) + tip : 0;
  function formatToMoneyFromDigits(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value;
    const clean = digits.replace(/\D/g, "");
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
      <div className="flex items-center flex-col justify-center gap-4 h-screen bg-gradient-to-br from-cyan-600 to-cyan-900 text-white p-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">Tip Calculator</h1>
          <h2 className="text-6xl font-mono">{moneyFormat(tip)}</h2>
          <p className="text-lg">
            Total Payment{" "}
            <span className="font-bold font-mono">{moneyFormat(total)}</span>
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-3xl">
          <form action="">
            <div className="flex flex-row gap-4 mb-4">
              <Label htmlFor="bill" className="flex-grow whitespace-nowrap">
                Bill Amount
              </Label>
              <Input
                type="text"
                id="bill"
                inputMode="numeric"
                placeholder="Enter bill amount"
                value={bill}
                onChange={formatToMoneyFromDigits}
                className="text-lg font-mono"
              />
            </div>
          </form>
          <Button
            variant={"default"}
            onClick={() => setBill("0.00")}
            className="w-full"
          >
            Clear
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
