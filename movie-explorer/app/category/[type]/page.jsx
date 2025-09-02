
import MovieGrid from "../../components/MovieGrid";

async function getMovies(type) {
  try {
   const res = await fetch(
  `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`,
  { next: { revalidate: 3600 } } // revalidate every hour
);

    if (!res.ok) {
      throw new Error(`Failed to fetch movies: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [] }; // return empty array on error
  }
}

export default async function CategoryPage({ params }) {
  const { type } = await params; // top_rated | popular | upcoming
  const data = await getMovies(type);

  return (
    <div className="px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">
        {type.replace("_", " ").toUpperCase()}
      </h1>

      {data?.results?.length > 0 ? (
        <MovieGrid movies={data.results} />
      ) : (
        <p className="text-gray-500">No movies found for {type}.</p>
      )}
    </div>
  );
}