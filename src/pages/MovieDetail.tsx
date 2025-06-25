import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMovieById, getMoviesByCategory } from '../services/movieService';
import MovieRow from '../components/MovieRow';

const DetailContainer = styled.div`
  background-color: #141414;
  min-height: 100vh;
  color: white;
`;

const BackButton = styled.button`
  position: absolute;
  top: 80px;
  left: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const HeroSection = styled.div<{ bgImage: string }>`
  position: relative;
  height: 70vh;
  min-height: 500px;
  background: linear-gradient(
      to bottom,
      rgba(20, 20, 20, 0.1) 0%,
      rgba(20, 20, 20, 0.7) 60%,
      rgba(20, 20, 20, 1) 100%
    ),
    url(${props => props.bgImage});
  background-size: cover;
  background-position: center top;
  padding: 0 60px;
  display: flex;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    padding: 0 20px;
    height: 50vh;
  }
`;

const MovieInfo = styled.div`
  max-width: 800px;
  margin-bottom: 50px;
`;

const MovieTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MovieMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const MovieRating = styled.span`
  color: #46d369;
  font-weight: 500;
`;

const MovieYear = styled.span`
  color: #ddd;
`;

const MovieGenres = styled.div`
  display: flex;
  gap: 10px;
  
  span {
    &:not(:last-child)::after {
      content: '•';
      margin-left: 10px;
    }
  }
`;

const MovieDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props => props.primary ? 'white' : 'rgba(109, 109, 110, 0.7)'};
  color: ${props => props.primary ? 'black' : 'white'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primary ? 'rgba(255, 255, 255, 0.8)' : 'rgba(109, 109, 110, 0.9)'};
  }
`;

const DetailSection = styled.div`
  padding: 40px 60px;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const CastList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
`;

const CastMember = styled.div`
  font-size: 1rem;
`;

interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseYear: string;
  rating: number;
  genre?: string[];
  cast?: string[];
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      
      try {
        if (id) {
          const movieId = parseInt(id);
          const movieData = await getMovieById(movieId);
          setMovie(movieData ?? null);
          
          // Get similar movies (using 'trending' as a placeholder)
          const similar = await getMoviesByCategory('trending');
          // Filter out the current movie
          setSimilarMovies(similar.filter(m => m.id !== movieId));
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  if (isLoading || !movie) {
    return (
      <DetailContainer>
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Loading...
        </div>
      </DetailContainer>
    );
  }
  
  return (
    <DetailContainer>
      <BackButton onClick={handleBack}>←</BackButton>
      
      <HeroSection bgImage={movie.backdropPath}>
        <MovieInfo>
          <MovieTitle>{movie.title}</MovieTitle>
          
          <MovieMeta>
            <MovieRating>{movie.rating}% Match</MovieRating>
            <MovieYear>{movie.releaseYear}</MovieYear>
            
            {movie.genre && (
              <MovieGenres>
                {movie.genre.map((genre, index) => (
                  <span key={index}>{genre}</span>
                ))}
              </MovieGenres>
            )}
          </MovieMeta>
          
          <MovieDescription>{movie.overview}</MovieDescription>
          
          <ActionButtons>
            <ActionButton primary>
              <span>▶</span> Play
            </ActionButton>
            <ActionButton>
              <span>+</span> My List
            </ActionButton>
            <ActionButton>
              <span>👍</span> Rate
            </ActionButton>
          </ActionButtons>
        </MovieInfo>
      </HeroSection>
      
      <DetailSection>
        <SectionTitle>About {movie.title}</SectionTitle>
        
        {movie.cast && movie.cast.length > 0 && (
          <>
            <h3 style={{ marginBottom: '10px' }}>Cast</h3>
            <CastList>
              {movie.cast.map((actor, index) => (
                <CastMember key={index}>{actor}</CastMember>
              ))}
            </CastList>
          </>
        )}
      </DetailSection>
      
      {similarMovies.length > 0 && (
        <MovieRow title="More Like This" movies={similarMovies} />
      )}
    </DetailContainer>
  );
};

export default MovieDetail; 