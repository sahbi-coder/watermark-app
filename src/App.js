import Header from "./components/Header";
import Home from "./routes/Home";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer";

function App() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Routes>
        <Route path="/" element={<Footer path="/" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
