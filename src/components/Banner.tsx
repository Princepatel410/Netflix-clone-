import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BannerContainer = styled.div<{ bgImage: string }>`
  position: relative;
  height: 80vh;
  min-height: 500px;
  color: white;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.1),
      rgba(20, 20, 20, 0.8)
    ),
    url(${props => props.bgImage});
  background-size: cover;
  background-position: center top;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 0 20px;
    height: 60vh;
  }
`;

const BannerContent = styled.div`
  max-width: 650px;
  margin-top: 60px;
`;

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const BannerDescription = styled.p<{ truncated: boolean }>`
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: ${props => (props.truncated ? 3 : 'none')};
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BannerButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const BannerButton = styled.button<{ primary?: boolean }>`
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
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  margin-top: 8px;
  
  &:hover {
    text-decoration: underline;
  }
`;

interface BannerProps {
  movie?: {
    id: number;
    title: string;
    overview: string;
    backdropPath: string;
  };
}

const Banner = ({ movie }: BannerProps) => {
  const [truncated, setTruncated] = useState(true);
  const navigate = useNavigate();
  
  // Default movie if none is provided
  const defaultMovie = {
    id: 1,
    title: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl. A love letter to the '80s classics that captivated a generation.",
    backdropPath: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg"
  };
  
  const featuredMovie = movie || defaultMovie;
  
  const handlePlay = () => {
    navigate(`/movie/${featuredMovie.id}`);
  };
  
  return (
    <BannerContainer bgImage={featuredMovie.backdropPath}>
      <BannerContent>
        <BannerTitle>{featuredMovie.title}</BannerTitle>
        <BannerDescription truncated={truncated}>
          {featuredMovie.overview}
        </BannerDescription>
        
        {featuredMovie.overview.length > 200 && (
          <ReadMoreButton onClick={() => setTruncated(!truncated)}>
            {truncated ? 'Read more' : 'Read less'}
          </ReadMoreButton>
        )}
        
        <BannerButtons>
          <BannerButton primary onClick={handlePlay}>
            <span>▶</span> Play
          </BannerButton>
          <BannerButton>
            <span>ℹ</span> More Info
          </BannerButton>
        </BannerButtons>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner; 