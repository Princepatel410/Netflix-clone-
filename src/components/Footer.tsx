import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #141414;
  color: #757575;
  padding: 50px 0;
  margin-top: 50px;
`;

const FooterContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterTitle = styled.p`
  margin-bottom: 30px;
  font-size: 16px;
`;

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterLink = styled.a`
  color: #757575;
  font-size: 13px;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  margin-top: 30px;
  font-size: 13px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTitle>Questions? Contact us.</FooterTitle>
        
        <FooterLinks>
          <FooterLink href="#">FAQ</FooterLink>
          <FooterLink href="#">Help Center</FooterLink>
          <FooterLink href="#">Account</FooterLink>
          <FooterLink href="#">Media Center</FooterLink>
          <FooterLink href="#">Investor Relations</FooterLink>
          <FooterLink href="#">Jobs</FooterLink>
          <FooterLink href="#">Ways to Watch</FooterLink>
          <FooterLink href="#">Terms of Use</FooterLink>
          <FooterLink href="#">Privacy</FooterLink>
          <FooterLink href="#">Cookie Preferences</FooterLink>
          <FooterLink href="#">Corporate Information</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">Speed Test</FooterLink>
          <FooterLink href="#">Legal Notices</FooterLink>
          <FooterLink href="#">Only on Netflix</FooterLink>
        </FooterLinks>
        
        <FooterBottom>
          <p>&copy; {new Date().getFullYear()} Netflix, Inc.</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 