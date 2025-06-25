import { useState, useRef } from 'react';
import styled from 'styled-components';
import MovieCard from './MovieCard';

const RowContainer = styled.div`
  margin: 20px 0 40px;
  position: relative;
`;

const RowTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 15px;
  padding-left: 60px;
  
  @media (max-width: 768px) {
    padding-left: 20px;
  }
`;

const RowContent = styled.div`
  position: relative;
  padding: 0 60px;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const MoviesSlider = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px 0;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MovieItem = styled.div`
  flex: 0 0 auto;
  width: 200px;
  padding: 0 5px;
  
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const SliderButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
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
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  releaseYear: string;
  rating: number;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow = ({ title, movies }: MovieRowProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
      
      sliderRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      
      // Update button visibility after scroll
      setTimeout(() => {
        if (sliderRef.current) {
          setShowLeftButton(sliderRef.current.scrollLeft > 0);
          setShowRightButton(
            sliderRef.current.scrollLeft + sliderRef.current.clientWidth < sliderRef.current.scrollWidth
          );
        }
      }, 300);
    }
  };
  
  const handleScroll = () => {
    if (sliderRef.current) {
      setShowLeftButton(sliderRef.current.scrollLeft > 0);
      setShowRightButton(
        sliderRef.current.scrollLeft + sliderRef.current.clientWidth < sliderRef.current.scrollWidth
      );
    }
  };
  
  return (
    <RowContainer>
      <RowTitle>{title}</RowTitle>
      <RowContent>
        {showLeftButton && (
          <SliderButton direction="left" onClick={() => scroll('left')}>
            ◀
          </SliderButton>
        )}
        
        <MoviesSlider ref={sliderRef} onScroll={handleScroll}>
          {movies.map(movie => (
            <MovieItem key={movie.id}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.posterPath}
                releaseYear={movie.releaseYear}
                rating={movie.rating}
              />
            </MovieItem>
          ))}
        </MoviesSlider>
        
        {showRightButton && (
          <SliderButton direction="right" onClick={() => scroll('right')}>
            ▶
          </SliderButton>
        )}
      </RowContent>
    </RowContainer>
  );
};

export default MovieRow; 