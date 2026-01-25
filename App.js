import Signup from "./pages/Signup";
import Login from "./Login";
import Mailbox from "./pages/Mailbox";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mailbox" element={<Mailbox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
