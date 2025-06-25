import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import { getAllMovies, getMoviesByCategory, movieCategories } from '../services/movieService';

const BrowseContainer = styled.div`
  background-color: #141414;
  min-height: 100vh;
  overflow-x: hidden;
  padding-bottom: 50px;
`;

const ContentContainer = styled.div`
  margin-top: -100px;
  position: relative;
  z-index: 1;
`;

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  releaseYear: string;
  rating: number;
}

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [movieRows, setMovieRows] = useState<{ title: string; movies: Movie[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const categoryParam = searchParams.get('category');
  
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      
      try {
        // Get all movies for the featured banner
        const allMovies = await getAllMovies();
        
        // Set a random movie as featured
        const randomIndex = Math.floor(Math.random() * allMovies.length);
        setFeaturedMovie(allMovies[randomIndex]);
        
        // Create movie rows based on categories
        const rows = [];
        
        // If a specific category is selected
        if (categoryParam && movieCategories[categoryParam as keyof typeof movieCategories]) {
          const categoryMovies = await getMoviesByCategory(categoryParam);
          rows.push({
            title: movieCategories[categoryParam as keyof typeof movieCategories],
            movies: categoryMovies
          });
        } else {
          // Otherwise show all categories
          for (const [category, title] of Object.entries(movieCategories)) {
            const categoryMovies = await getMoviesByCategory(category);
            if (categoryMovies.length > 0) {
              rows.push({ title, movies: categoryMovies });
            }
          }
        }
        
        setMovieRows(rows);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovies();
  }, [categoryParam]);
  
  if (isLoading) {
    return (
      <BrowseContainer>
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
          Loading...
        </div>
      </BrowseContainer>
    );
  }
  
  return (
    <BrowseContainer>
      {featuredMovie && <Banner movie={featuredMovie} />}
      
      <ContentContainer>
        {movieRows.map((row, index) => (
          <MovieRow key={index} title={row.title} movies={row.movies} />
        ))}
      </ContentContainer>
    </BrowseContainer>
  );
};

export default Browse; 