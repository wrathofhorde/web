import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routers/Home";
import Detail from "./Routers/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
