import useStockStore from "@/hooks/useStockStore";
import React from "react";

export default function StockList() {
  const { stocks, isLoading, error } = useStockStore();

  console.log(stocks);

  return (
    <div className="p-8 rounded-md bg-slate-800">
      <h2 className="text-2xl text-gray-400 mb-8">Popular stocks to boost your savings</h2>
      {isLoading ? (
        <div>Loading stocks...</div>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <ul className="flex flex-col gap-6 mt-12">
          {stocks.map((stock) => {
            return (
              <li
                key={stock.description}
                className="flex lg:grid flex-col  lg:grid-cols-[repeat(3,1fr)] justify-between">
                <p className="text-lg text-gray-400">
                  Name <span className="text-white">{stock.description}</span>
                </p>
                <p className="ml-2 lg:ml-0 text-gray-400">
                  Currency <span className="text-white">{stock.currency}</span>
                </p>
                <p className="ml-2 lg:ml-0 text-gray-400">
                  Symbol <span className="text-white">{stock.displaySymbol}</span>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
