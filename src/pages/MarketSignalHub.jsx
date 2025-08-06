import React, { useState } from 'react';

const mockSignals = [
  {
    symbol: "USD/JPY",
    tradeType: "Buy",
    timeframe: "1D",
    entry: "143.50",
    stopLoss: "142.80",
    takeProfit: "145.00",
    analysis: "USD strength due to high CPI YoY and rising rates.",
    tags: "macro,bullish,breakout",
    embedLink: "https://www.tradingview.com/embed/example",
    logic1Score: 8,
    logic2Score: 9,
    catalystScore: 7,
    catalystBias: "Bullish",
    catalysts: [
      { type: "CPI", expected: "3.1%", actual: "3.6%", eventDate: "2025-08-01", bias: "Bullish" },
      { type: "PMI", expected: "52.0", actual: "48.5", eventDate: "2025-08-03", bias: "Bearish" }
    ]
  }
];

export default function MarketSignalHub() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📈 Market Signal Hub</h1>
      {mockSignals.map((signal, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-md mb-6">
          <h3 className="font-bold text-lg">
            {signal.symbol} ({signal.tradeType})
          </h3>
          <p>Timeframe: {signal.timeframe}</p>
          <p>Entry: {signal.entry} | SL: {signal.stopLoss} | TP: {signal.takeProfit}</p>
          <p className="text-sm text-gray-600">{signal.analysis}</p>
          <div className="mt-2">
            <strong>Logic 1 Score:</strong> {signal.logic1Score} <br />
            <strong>Logic 2 Score:</strong> {signal.logic2Score} <br />
            <strong>Catalyst Score:</strong> {signal.catalystScore} <br />
            <strong>Bias:</strong> {signal.catalystBias}
          </div>
          {signal.catalysts.length > 0 && (
            <div className="mt-3">
              <strong>Catalysts:</strong>
              <ul className="list-disc ml-6">
                {signal.catalysts.map((cat, i) => (
                  <li key={i}>
                    {cat.type}: {cat.actual} vs {cat.expected} on {cat.eventDate} — <strong>{cat.bias}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {signal.embedLink && (
            <div className="mt-4">
              <iframe
                src={signal.embedLink}
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
