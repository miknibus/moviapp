import { useEffect, useCallback, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Detail() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState('');
  const { id } = useParams();
  const getDetails = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetails(json.data.movie);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getDetails();
  }, [getDetails, id]);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={details.large_cover_image} alt='Movie poster'></img>
          <h1>{details.title}</h1>
          <p>{details.description_full}</p>
          <Link to={'/'}>'Return to Movies List'</Link>
        </div>
      )}
    </div>
  );
}

export default Detail;
