import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { getUser } from "../../services/authService";
import * as hootService from "../../services/hootService";
import HomePage from "../HomePage/HomePage";
import HootListPage from "../HootListPage/HootListPage";
import HootDetailsPage from "../HootDetailsPage/HootDetailsPage";
import NewHootPage from "../NewHootPage/NewHootPage";
import EditHootPage from "../EditHootPage/EditHootPage";
import CommentForm from "../../components/CommentForm/CommentForm";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";
import NavBar from "../../components/NavBar/NavBar";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();
  const handleDeleteHoot = async (hootId) => {
    const deletedHoot = await hootService.deleteHoot(hootId);
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot._id));
    navigate("/hoots");
  };
  const handleUpdateHoot = async (hootId, hootFormData) => {
    const updatedHoot = await hootService.update(hootId, hootFormData);
    setHoots(hoots.map((hoot) => (hoot._id === hootId ? updatedHoot : hoot)));
    navigate(`/hoots/${hootId}`);
  };

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hoots" element={<HootListPage user={user} />} />
            <Route
              path="/hoots/:hootId"
              element={
                <HootDetailsPage
                  user={user}
                  handleDeleteHoot={handleDeleteHoot}
                />
              }
            />
            <Route path="/hoots/new" element={<NewHootPage />} />
            <Route
              path="/hoots/:hootId/edit"
              element={<EditHootPage handleUpdateHoot={handleUpdateHoot} />}
            />
            <Route
              path="/hoots/:hootId/comments/:commentId/edit"
              element={<CommentForm />}
            />
            ;
            <Route path="*" element={null} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="*" element={null} />
          </Routes>
        )}
      </section>
    </main>
  );
}
