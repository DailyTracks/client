import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./componets/Header";

function App() {
  return (
    <div>
      {/* 시맨틱 구조로 구성하기 */}
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
