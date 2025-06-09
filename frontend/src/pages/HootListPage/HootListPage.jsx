import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as hootService from "../../services/hootService";

export default function HootListPage({ user }) {
  const [hoots, setHoots] = useState([]);
  useEffect(() => {
    async function fetchHoots() {
      const hoots = await hootService.index();
      setHoots(hoots);
      console.log("hoots", hoots);
    }
    if (user) {
      fetchHoots();
    }
  }, [user]);

  return (
    <>
      <h1>Hoot List</h1>
      {hoots.length ? (
        <main>
          {hoots.map((hoot) => (
            <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
              <article>
                <header>
                  <h2>{hoot.title}</h2>
                  <p>
                    {`${hoot.author.username} posted on
                      ${new Date(hoot.createdAt).toLocaleDateString()}`}
                  </p>
                </header>
                <p>{hoot.text}</p>
              </article>
            </Link>
          ))}
        </main>
      ) : (
        <p>No Hoots Yet!</p>
      )}
    </>
  );
}
