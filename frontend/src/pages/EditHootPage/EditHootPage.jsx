import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as hootService from "../../services/hootService";

export default function EditHootPage({ handleUpdateHoot }) {
  const { hootId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "News",
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchHoot = async () => {
      try {
        const hootData = await hootService.show(hootId);
        setFormData(hootData);
      } catch (err) {
        console.log(err);
        setErrorMsg("Failed to load hoot data.");
      }
    };
    if (hootId) fetchHoot();

    return () => setFormData({ title: "", text: "", category: "News" });
  }, [hootId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleUpdateHoot(hootId, formData);
    } catch (err) {
      setErrorMsg("Updating Hoot Failed");
    }
  }

  return (
    <main>
      <h1>Edit Hoot</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>
        <button type="submit">UPDATE</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </main>
  );
}
