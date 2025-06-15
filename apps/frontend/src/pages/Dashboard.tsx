import { useEffect, useRef, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { fetchSummary } from '../api';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface Summary {
  income: number;
  expenses: number;
  balance: number;
  history: { month: string; value: number }[];
}

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    fetchSummary().then((data) => setSummary(data));
  }, []);

  useEffect(() => {
    if (summary && canvasRef.current) {
      new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: summary.history.map((h) => h.month),
          datasets: [
            {
              label: 'Valor',
              data: summary.history.map((h) => h.value),
              backgroundColor: 'rgb(59 130 246)',
            },
          ],
        },
      });
    }
  }, [summary]);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      {summary ? (
        <div>
          <p className="mb-2">Income: {summary.income}</p>
          <p className="mb-2">Expenses: {summary.expenses}</p>
          <p className="mb-4 font-bold">Balance: {summary.balance}</p>
          <canvas ref={canvasRef} width={400} height={200} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
