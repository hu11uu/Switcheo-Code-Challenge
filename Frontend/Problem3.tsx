import React, { useState, useEffect, useMemo } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

class Datasource {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getPrices(): Promise<Record<string, number>> {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error("Failed to fetch prices");
      return response.json();
    } catch (error) {
      console.error("Error fetching prices:", error);
      return {};
    }
  }
}

// Simulated wallet balances
const useWalletBalances = (): WalletBalance[] => {
  return [
    { currency: "ETH", amount: 2, blockchain: "Ethereum" },
    { currency: "BTC", amount: 0.5, blockchain: "Osmosis" },
    { currency: "SOL", amount: 5, blockchain: "Solana" },
  ];
};

const WalletRow = ({
  amount,
  usdValue,
  formattedAmount,
}: {
  amount: number;
  usdValue: number;
  formattedAmount: string;
}) => (
  <div style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
    <p>
      <strong>Amount:</strong> {formattedAmount}
    </p>
    <p>
      <strong>USD Value:</strong> ${usdValue.toFixed(2)}
    </p>
  </div>
);

const WalletPage: React.FC = () => {
  const balances = useWalletBalances();
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrices = async (retries = 3) => {
      try {
        const datasource = new Datasource(
          "https://interview.switcheo.com/prices.json"
        );
        const fetchedPrices = await datasource.getPrices();

        if (!fetchedPrices || Object.keys(fetchedPrices).length === 0) {
          throw new Error("No price data available");
        }

        setPrices(fetchedPrices);
        setError("");
      } catch (err) {
        if (retries > 0) {
          console.warn(`Retrying... (${4 - retries}/3)`);
          setTimeout(() => fetchPrices(retries - 1), 5000);
        } else {
          setError("Failed to fetch prices after multiple attempts.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const getPriority = (blockchain: string): number => {
    const priorities: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorities[blockchain] ?? -99;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0
      )
      .sort(
        (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);

  const rows = sortedBalances.map((balance) => {
    const usdValue = (prices[balance.currency] ?? 100) * balance.amount;
    return (
      <WalletRow
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed(2)}
      />
    );
  });

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      <h2>My Wallet</h2>
      {loading ? (
        <p>Loading prices...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        rows
      )}
    </div>
  );
};

export default WalletPage;

// Issues and Improvements for Problem 3

// 1.	Inaccurate Console Logging

// Issue: console.err(error) is not a function
// Fix/Improvement: Change to console.error(error) instead

// 2.	Incorrect useEffect Dependency Handling

// Issue: The useEffect runs only once.
// Fix/Improvement: Use an async function inside useEffect

// 3.	Never implement Datasource Class

// Issue: Datasource class is not defined
// Fix/Improvement: Implement Datasource using fetch()

// 4.	Wrong Sorting Logic used in useMemo

// Issue: LhsPriority is not properly defined
// Fix/Improvement: Use balancePriority in the filtering condition to check

// 5.	Unncessary .map() call on sortedBalances

// Issue: The sortedBalances is mapped twice
// Fix: Merge the formatting logic into the rows computation

// 6.	Incorrect Prop Types for WalletRow

// Issue: The WalletRow receieves formattedAmount form the balance.formatted, but sortedBalances uses WalletBallance which is not formatted
// Fix: Use formattedBalances instead of sortedBalances

// 7.	Uncertainty in price values

// Issue: prices[balance.currency] might be undefined which can cause NaN values
// Fix: Use optional chaining with a default value
