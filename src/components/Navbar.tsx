import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  padding: 0 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: background-color 0.3s ease;
  background-color: ${props => props.scrolled ? '#141414' : 'transparent'};
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const LogoText = styled.h1`
  color: #e50914;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #e5e5e5;
  margin: 0 10px;
  font-size: 14px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #b3b3b3;
  }
`;

const AuthButton = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f40612;
  }
`;

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Navbar = ({ isLoggedIn, setIsLoggedIn }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleAuth = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate('/');
    } else {
      setIsLoggedIn(true);
      navigate('/browse');
    }
  };
  
  return (
    <Nav scrolled={scrolled}>
      <Link to="/">
        <LogoText>NETFLUX</LogoText>
      </Link>
      
      <NavItems>
        {isLoggedIn && (
          <NavLinks>
            <NavLink to="/browse">Home</NavLink>
            <NavLink to="/browse?category=tv">TV Shows</NavLink>
            <NavLink to="/browse?category=movies">Movies</NavLink>
            <NavLink to="/browse?category=new">New & Popular</NavLink>
            <NavLink to="/browse?category=mylist">My List</NavLink>
          </NavLinks>
        )}
        
        <AuthButton onClick={handleAuth}>
          {isLoggedIn ? 'Sign Out' : 'Sign In'}
        </AuthButton>
      </NavItems>
    </Nav>
  );
};

export default Navbar; 