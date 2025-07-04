import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import * as commentService from "../../services/commentService";
import * as hootService from "../../services/hootService";

export default function CommentForm(props) {
  const [formData, setFormData] = useState({ text: "" });
  const { hootId, commentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setFormData(
        hootData.comments.find((comment) => comment._id === commentId)
      );
    };
    if (hootId && commentId) fetchHoot();
  }, [hootId, commentId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (hootId && commentId) {
      await commentService.updateComment(hootId, commentId, formData);
      navigate(`/hoots/${hootId}`);
    } else {
      props.handleAddComment(formData);
      setFormData({ text: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">Your comment:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
      <button type="submit">SUBMIT COMMENT</button>
    </form>
  );
}
