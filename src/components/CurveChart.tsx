import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const BondingCurveCalculator = () => {
  const [k, setK] = useState(0.00000000284201);
  const [initialPrice, setInitialPrice] = useState(0.000000028);
  const E = Math.E;

  // Generate graph data
  const generateData = () => {
    const data = [];
    for (let i = 0; i <= 800; i++) {
      const tokens = i * 1000000;
      const price = initialPrice * Math.pow(E, k * tokens);
      data.push({ tokens, price });
    }
    return data;
  };

  return (
    <div className="p-4">
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            K value (try: 0.00000000284201)
          </label>
          <input
            type="number"
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-full p-2 border rounded"
            step="0.00000000000001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Initial Price (try: 0.000000028)
          </label>
          <input
            type="number"
            value={initialPrice}
            onChange={(e) => setInitialPrice(Number(e.target.value))}
            className="w-full p-2 border rounded"
            step="0.000000001"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <p className="font-mono">
            Current equation: Price = {initialPrice.toExponential(9)} × e^(
            {k.toExponential(9)} × tokens)
          </p>
        </div>
      </div>

      <div className="h-80">
        <LineChart
          width={600}
          height={300}
          data={generateData()}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="tokens"
            tickFormatter={(value) => `${value / 1000000}M`}
            label={{ value: 'Token Supply (Millions)', position: 'bottom' }}
          />
          <YAxis
            tickFormatter={(value) => value.toExponential(2)}
            label={{ value: 'Price', angle: -90, position: 'left' }}
          />
          <Tooltip
            //   @ts-ignore
            formatter={(value) => value.toExponential(9)}
            labelFormatter={(value) =>
              `${(value / 1000000).toFixed(1)}M tokens`
            }
          />
          <Line type="monotone" dataKey="price" stroke="#2563eb" dot={false} />
        </LineChart>
      </div>
    </div>
  );
};

export default BondingCurveCalculator;
