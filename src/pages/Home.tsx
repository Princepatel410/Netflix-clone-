import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  background-color: black;
  min-height: 100vh;
  color: white;
`;

const HeroSection = styled.div`
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.8)
  ), url('https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/64774cd8-5c3a-4823-a0bb-1610d6971bd4/US-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin-top: 100px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const GetStartedForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FormText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  height: 60px;
  padding: 0 15px;
  font-size: 1rem;
  border: 1px solid #8c8c8c;
  border-radius: 4px 0 0 4px;
  
  @media (max-width: 768px) {
    border-radius: 4px;
    margin-bottom: 15px;
  }
`;

const GetStartedButton = styled.button`
  background-color: #e50914;
  color: white;
  height: 60px;
  padding: 0 30px;
  font-size: 1.5rem;
  font-weight: 500;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #f40612;
  }
  
  @media (max-width: 768px) {
    border-radius: 4px;
    width: 100%;
    justify-content: center;
  }
`;

const FeaturesSection = styled.section`
  border-top: 8px solid #222;
  padding: 70px 45px;
  
  @media (max-width: 768px) {
    padding: 50px 20px;
  }
`;

const FeatureContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

const FeatureText = styled.div`
  flex: 1;
  padding-right: 20px;
  
  @media (max-width: 768px) {
    text-align: center;
    padding-right: 0;
    margin-bottom: 30px;
  }
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FeatureImage = styled.div`
  flex: 1;
  position: relative;
  
  img {
    width: 100%;
    z-index: 1;
  }
`;

interface HomeProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Home = ({ isLoggedIn, setIsLoggedIn }: HomeProps) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoggedIn(true);
      navigate('/browse');
    }
  };
  
  if (isLoggedIn) {
    navigate('/browse');
    return null;
  }
  
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Unlimited movies, TV shows, and more</HeroTitle>
          <HeroSubtitle>Watch anywhere. Cancel anytime.</HeroSubtitle>
          
          <GetStartedForm>
            <FormText>Ready to watch? Enter your email to create or restart your membership.</FormText>
            <form onSubmit={handleGetStarted}>
              <InputGroup>
                <EmailInput 
                  type="email" 
                  placeholder="Email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <GetStartedButton type="submit">
                  Get Started <span style={{ marginLeft: '10px' }}>▶</span>
                </GetStartedButton>
              </InputGroup>
            </form>
          </GetStartedForm>
        </HeroContent>
      </HeroSection>
      
      <FeaturesSection>
        <FeatureContainer>
          <FeatureText>
            <FeatureTitle>Enjoy on your TV</FeatureTitle>
            <FeatureDescription>
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
            </FeatureDescription>
          </FeatureText>
          <FeatureImage>
            <img 
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" 
              alt="TV" 
            />
          </FeatureImage>
        </FeatureContainer>
      </FeaturesSection>
      
      <FeaturesSection>
        <FeatureContainer>
          <FeatureText>
            <FeatureTitle>Download your shows to watch offline</FeatureTitle>
            <FeatureDescription>
              Save your favorites easily and always have something to watch.
            </FeatureDescription>
          </FeatureText>
          <FeatureImage>
            <img 
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" 
              alt="Mobile" 
            />
          </FeatureImage>
        </FeatureContainer>
      </FeaturesSection>
      
      <FeaturesSection>
        <FeatureContainer>
          <FeatureText>
            <FeatureTitle>Watch everywhere</FeatureTitle>
            <FeatureDescription>
              Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
            </FeatureDescription>
          </FeatureText>
          <FeatureImage>
            <img 
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" 
              alt="Devices" 
            />
          </FeatureImage>
        </FeatureContainer>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home; 