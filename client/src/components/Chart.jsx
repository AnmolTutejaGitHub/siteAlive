import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import Navbar from './Navbar';
import Footer from "./Footer";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Chart() {
  const { id } = useParams();
  const [query, setQuery] = useState(null);

  async function getQuery() {
    try {
      const response = await axios.get(`http://localhost:8080/query/${id}`);
      setQuery(response.data);
    } catch (err) {
      console.error("Error fetching query:", err);
    }
  }

  useEffect(() => {
    getQuery();
  }, []);

  if (!query) return <div>Loading...</div>;

  const statusCodeCounts = {};
  query.d_servers_response.forEach(server => {
    const code = server.statusCode;
    statusCodeCounts[code] = (statusCodeCounts[code] || 0) + 1;
  });

  const data = {
    labels: Object.keys(statusCodeCounts),
    datasets: [
      {
        label: 'Status Code Count',
        data: Object.values(statusCodeCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
  };

  return (
    <div className='p-4 mt-10'>
        {/* <Navbar/> */}
      <h2 className='text-bold text-2xl text-center p-2 mb-4'>Server Status Chart</h2>
      <div className='flex justify-center'>
      <div style={{ height: '400px', width: '50%' }} >
        <Bar data={data} options={options} />
     </div>
     </div>

    <div className='mt-10 flex justify-center flex-col items-center'>
        <div className='w-50%'>
    <h3 className="text-xl font-semibold mt-8 mb-4">Details</h3>
    <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
    <tbody>
    <tr className="bg-gray-100">
      <td className="px-4 py-2 font-medium border-b border-gray-300">Username</td>
      <td className="px-4 py-2 border-b border-gray-300">{query.username}</td>
    </tr>
    <tr>
      <td className="px-4 py-2 font-medium border-b border-gray-300">URL</td>
      <td className="px-4 py-2 border-b border-gray-300">
        <a href={query.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {query.url}
        </a>
      </td>
    </tr>
    <tr className="bg-gray-100">
      <td className="px-4 py-2 font-medium">Reachable</td>
      <td className="px-4 py-2">{query.reachable ? "Yes" : "No "}</td>
    </tr>
  </tbody>
    </table>
    </div>
    
      </div>
      <div className='mt-20'>
      <Footer/>
      </div>
    </div>
  );
}

export default Chart;