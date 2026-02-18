import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
    </Routes>
  );
}

export default App;
