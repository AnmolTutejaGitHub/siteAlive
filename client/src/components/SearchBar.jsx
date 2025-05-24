import { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

function SearchBar() {
    const [url,setUrl] = useState('');

    async function ping(){
        const toastId = toast.loading('Posting...');
        try{
        const response = await axios.get(`http://localhost:8080/check?url=${encodeURIComponent(url)}`);
        if(response.data.status.reachable) toast.success(`${url} is up`);
        else toast.success(`${url} is down !`)
        }catch(err){
            toast.error('some error occurred');
            toast.dismiss(toastId);
        }finally{
            toast.dismiss(toastId);
        }
    }

    return (
      <div className="h-100 flex items-center flex-col  bg-[#B3C100] justify-center">
        <div className="py-4 pb-8 px-2 text-white flex justify-center flex-col items-center gap-2">
            <div className="px-2 text-4xl">Is It Down</div>
            <div className="text-2xl">Quickly check if a website is down for everyone or just you.</div>
        </div>
        <div className="rounded-full bg-white w-[70%] p-1 h-20 flex border-2 border-[#CED2CB]">
          <input
            placeholder="https://google.com"
            className="w-[90%] h-full outline-none px-4 pl-8"
            onChange={(e)=>setUrl(e.target.value)}
          />
          <button className="text-white bg-[#AC3D31] rounded-full p-2 px-4 m-2 cursor-pointer" onClick={ping}>Ping Now</button>
        </div>
      </div>
    );
  }
  export default SearchBar;