import axios from "axios";
import { useState, useEffect } from "react";

function TopResult() {
  const [results, setResults] = useState([]);
  const [reload,setReload] = useState(false);

  async function getRecentResults() {
    try {
      const response = await axios.get("http://localhost:8080/recentCheck");
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRecentResults();
  }, [reload]);

  const renderResult = () => {
    return results.map((result, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-md border border-gray-200"
          >
  
            <div className="text-gray-700">
              URL:
              <span className="text-blue-600 underline break-all">
                <a target="_blank" href={result.url}>
                {result.url}
                </a>
              </span>
            </div>
  
            <div className="text-gray-700">
              Domain: <span className="text-gray-600">{result.domain}</span>
            </div>
  
            <div className="text-gray-700">
              Reachable:
              <span className="text-gray-600">
                {result.url_reachable}/{result.d_servers_count}
              </span>
            </div>
  
            <div className="mt-2 text-gray-700 font-semibold">Responses:</div>
            <ul className="ml-6 list-disc mt-1">
              {result.d_servers_response.map((res, idx) => (
                <li
                  key={idx}
                  className={res.up ? "text-green-600" : "text-red-600"}
                >
                  {res.up ? "Up" : "Down"} (Status Code: {res.statusCode})
                </li>
              ))}
            </ul>
  
            <div className="mt-2 text-sm text-gray-500">
              Checked at:{" "}
              {new Date(result.timestamp).toLocaleString()}
            </div>
          </div>
        ))
  };

  return (
    <div>
     <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-[#1F3F49] w-full p-2 pt-6 text-center">Top Searches</h2>
         </div>
        </div>
        <div>
           <button className="bg-white rounded-sm shadow-md border border-gray-200 p-2 ml-4 cursor-pointer" onClick={()=>setReload(!reload)}>refresh</button>
        </div>
      <div className="flex flex-wrap flex-row p-4 gap-4 w-full">{renderResult()}</div>
      {results.length==0 && <div className="flex justify-center items-center">
            <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 w-[80%] h-40 flex justify-center items-center text-xl">
                No Recent Searches
            </div>
        </div>
      }
    </div>
  );
}

export default TopResult;