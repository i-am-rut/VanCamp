import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Income = () => {
  const [earnings, setEarnings] = useState(null);
  const [filter, setFilter] = useState("total"); // Default: Total earnings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarnings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/host/earnings?filter=${filter}`, { credentials: "include" });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch earnings");
        setEarnings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [filter]);

  if (loading) return <p>Loading earnings...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!earnings) return <p>No earnings data available.</p>;

  const chartData = {
    labels: Object.keys(earnings.vanEarnings), // Van names
    datasets: [
      {
        label: `Earnings (${filter})`,
        data: Object.values(earnings.vanEarnings), // Earnings values
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Earnings Summary</h2>
      <div className="mb-4">
        <label className="mr-2">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="total">Total</option>
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="w-full max-w-2xl">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { display: true } },
            scales: {
              y: { beginAtZero: true, ticks: { callback: (value) => `$${value}` } },
            },
          }}
        />
      </div>

      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <p><strong>Total Earnings:</strong> ${earnings.totalEarnings}</p>
        <p><strong>Average Per Booking:</strong> ${earnings.avgEarnings.toFixed(2)}</p>
        <p><strong>Total Bookings:</strong> {earnings.totalBookings}</p>
      </div>
    </div>
  );
};

export default Income;
