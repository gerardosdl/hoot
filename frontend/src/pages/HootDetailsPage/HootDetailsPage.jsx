import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import CommentForm from "../../components/CommentForm/CommentForm";
import * as hootService from "../../services/hootService";
import * as commentService from "../../services/commentService";

export default function HootDetailsPage({ user, handleDeleteHoot }) {
  const { hootId } = useParams();
  console.log("hootId", hootId);
  const [hoot, setHoot] = useState(null);

  useEffect(() => {
    async function fetchHoot() {
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    }
    fetchHoot();
  }, [hootId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await commentService.create(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };
  // Verify the hoot state is set correctly:
  console.log("hoot state:", hoot);

  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(hoot._id, commentId);
      setHoot({
        ...hoot,
        comments: hoot.comments.filter((c) => c._id !== commentId),
      });
    } catch (err) {
      console.log(err);
    }
  };
  if (!hoot) return <main>Loading...</main>;
  return (
    <main>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <p>
            {`${hoot.author.name} posted on
            ${new Date(hoot.createdAt).toLocaleDateString()}`}
          </p>
          {hoot.author._id === user._id && (
            <>
              <Link to={`/hoots/${hootId}/edit`}>Edit</Link>

              <button onClick={() => handleDeleteHoot(hootId)}>Delete</button>
            </>
          )}
        </header>
        <p>{hoot.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
        {/* Pass the handleAddComment function to the CommentForm Component */}
        <CommentForm handleAddComment={handleAddComment} />

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.name} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>
              {comment.author._id === user._id && (
                <>
                  <Link to={`/hoots/${hoot._id}/comments/${comment._id}/edit`}>
                    Edit
                  </Link>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    Delete
                  </button>
                </>
              )}
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
