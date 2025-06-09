import { useState } from "react";
import { useNavigate } from "react-router";
import * as hootService from "../../services/hootService";

export default function NewHootPage() {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    category: "News",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // sendRequest is expecting an object as the payload
      await hootService.create(formData);
      navigate("/hoots");
    } catch (err) {
      setErrorMsg("Adding Hoot Failed");
    }
  }

  return (
    <>
      <main>
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
            type="text"
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
          <button type="submit">SUBMIT</button>
        </form>
        <p className="error-message">&nbsp;{errorMsg}</p>
      </main>
    </>
  );
}
