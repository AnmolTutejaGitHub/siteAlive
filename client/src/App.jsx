import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Toaster } from 'react-hot-toast';
import Chart from "./components/Chart";


function App() {
  return (<div>
    <Toaster />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/chart/:id" element={<Chart/>}></Route>
    </Routes>
    </BrowserRouter>
  </div>);
}

export default App
