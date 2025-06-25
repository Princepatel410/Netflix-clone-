import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 150%;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div<{ isHovered: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  padding: 10px;
  opacity: ${props => props.isHovered ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const CardTitle = styled.h3`
  font-size: 14px;
  margin-bottom: 5px;
  color: white;
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardRating = styled.span`
  color: #46d369;
  font-size: 12px;
`;

const CardYear = styled.span`
  color: #ddd;
  font-size: 12px;
`;

const CardControls = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const CardButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  releaseYear: string;
  rating: number;
}

const MovieCard = ({ id, title, posterPath, releaseYear, rating }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/movie/${id}`);
  };
  
  return (
    <Card 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardImage src={posterPath} alt={title} />
      <CardOverlay isHovered={isHovered}>
        <CardTitle>{title}</CardTitle>
        <CardInfo>
          <CardRating>{rating}% Match</CardRating>
          <CardYear>{releaseYear}</CardYear>
        </CardInfo>
        <CardControls>
          <CardButton>▶</CardButton>
          <CardButton>+</CardButton>
          <CardButton>👍</CardButton>
        </CardControls>
      </CardOverlay>
    </Card>
  );
};

export default MovieCard; 