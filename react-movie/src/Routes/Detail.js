import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <>
      <h3>Detail</h3>
      <p>{loading ? "Loading" : "finished"}</p>
    </>
  );
}

export default Detail;
