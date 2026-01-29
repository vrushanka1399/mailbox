import Signup from "./pages/Signup";
import Login from "./Login";
import Mailbox from "./pages/Mailbox";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComposeMail from "./ComposeMail";
import Inbox from "./pages/Inbox";
import MailDetail from "./pages/MailDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mailbox" element={<Mailbox />} />
        <Route path="/compose" element={<ComposeMail />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/mail/:id" element={<MailDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
