import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Income = () => {
  const [earnings, setEarnings] = useState(null);
  const [filter, setFilter] = useState("total"); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarnings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://vancamp-backend.onrender.com/api/host/earnings?filter=${filter}`, { credentials: "include" });
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
    <div className="host-income-page-container">
      <h2 className="host-income-page-title">Earnings Summary</h2>
      <div className="host-income-page-filter-container">
        <label className="host-income-filter-title">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded host-income-filter-selector"
        >
          <option value="total">Total</option>
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="host-income-bar-graph-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { display: true } },
            scales: {
              y: { beginAtZero: true, ticks: { callback: (value) => `₹${value}` } },
            },
          }}
        />
      </div>

      <div className="host-income-summary-container">
        <p><strong>Total Earnings:</strong> &#8377;{earnings.totalEarnings}</p>
        <p><strong>Average Per Booking:</strong> &#8377;{earnings.avgEarnings.toFixed(2)}</p>
        <p><strong>Total Bookings:</strong> {earnings.totalBookings}</p>
      </div>
    </div>
  );
};

export default Income;
