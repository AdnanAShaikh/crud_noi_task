import Landing from "./pages/Landing";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost";
import Register from "./pages/Register";
import Create from "./pages/Create";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<Create />} />
      <Route path="/home" element={<Landing />} />
      <Route path="/view/:id" element={<ViewPost />} />
      <Route path="/edit/:id" element={<EditPost />} />
    </Routes>
  );
}

export default App;
