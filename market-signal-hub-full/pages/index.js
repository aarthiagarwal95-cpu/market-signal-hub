import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = ["Forex", "Indian Stocks", "NYSE Stocks"];
const mockUser = { email: "admin@example.com", password: "password" };

export default function MarketSignalHub() {
  const [signals, setSignals] = useState([]);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState(null);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    if (
      authForm.email === mockUser.email &&
      authForm.password === mockUser.password
    ) {
      setUser({ email: authForm.email });
    } else {
      alert("Invalid credentials");
    }
  };

  const handleChange = (e, category) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: value,
      },
    }));
  };

  const handleSave = (category) => {
    const data = formData[category];
    if (!data) return;
    const newSignal = {
      ...data,
      category,
      timestamp: new Date().toISOString(),
    };
    setSignals((prev) => [...prev, newSignal]);
    setFormData((prev) => ({ ...prev, [category]: {} }));
  };

  if (!user) {
    return (
      <div className="p-6 max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Login to Market Signal Hub</h1>
        <Input
          name="email"
          placeholder="Email"
          value={authForm.email}
          onChange={handleAuthChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={authForm.password}
          onChange={handleAuthChange}
        />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📈 Market Signal Hub</h1>
      {categories.map((category) => (
        <div key={category}>
          <h2 className="text-2xl font-semibold mt-6">{category} Signals</h2>
          <Card className="mt-4">
            <CardContent className="space-y-4 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input name="symbol" placeholder="Symbol" value={formData[category]?.symbol || ""} onChange={(e) => handleChange(e, category)} />
                <Input name="tradeType" placeholder="Trade Type" value={formData[category]?.tradeType || ""} onChange={(e) => handleChange(e, category)} />
                <Input name="timeframe" placeholder="Timeframe" value={formData[category]?.timeframe || ""} onChange={(e) => handleChange(e, category)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input name="entry" placeholder="Entry Price" value={formData[category]?.entry || ""} onChange={(e) => handleChange(e, category)} />
                <Input name="stopLoss" placeholder="Stop Loss" value={formData[category]?.stopLoss || ""} onChange={(e) => handleChange(e, category)} />
                <Input name="takeProfit" placeholder="Take Profit" value={formData[category]?.takeProfit || ""} onChange={(e) => handleChange(e, category)} />
              </div>
              <Input name="tags" placeholder="Tags (comma-separated)" value={formData[category]?.tags || ""} onChange={(e) => handleChange(e, category)} />
              <Textarea name="analysis" placeholder="Technical and Fundamental Analysis" value={formData[category]?.analysis || ""} onChange={(e) => handleChange(e, category)} />
              <Input name="embedLink" placeholder="TradingView Embed Link" value={formData[category]?.embedLink || ""} onChange={(e) => handleChange(e, category)} />
              <Button onClick={() => handleSave(category)}>Save Signal</Button>
            </CardContent>
          </Card>
          <div className="space-y-4 mt-6">
            {signals.filter((s) => s.category === category).map((signal, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-bold">{signal.symbol} ({signal.tradeType})</h3>
                  <p>Timeframe: {signal.timeframe}</p>
                  <p>Entry: {signal.entry} | SL: {signal.stopLoss} | TP: {signal.takeProfit}</p>
                  {signal.tags && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {signal.tags.split(",").map((tag) => (
                        <Badge key={tag}>{tag.trim()}</Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">{signal.analysis}</p>
                  {signal.embedLink && (
                    <div className="mt-4">
                      <iframe src={signal.embedLink} width="100%" height="400" frameBorder="0" allowFullScreen></iframe>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}