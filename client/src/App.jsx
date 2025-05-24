import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Toaster } from 'react-hot-toast';


function App() {
  return (<div>
    <Toaster />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
  </div>);
}

export default App
