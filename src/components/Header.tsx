/* src/components/Header.tsx */
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaHome, FaList, FaFire, FaPlus } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, var(--ajou-navy) 0%, var(--ajou-blue) 100%);
  color: white;
  padding: 1rem;
  border-bottom: 4px solid var(--ajou-sky);
`;

const Title = styled.h1`
  text-align: center;
  margin: 0 0 1rem;
  font-size: 1.75rem;
  letter-spacing: -0.02em;
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  max-width: 720px;
  margin: 0 auto;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: inherit;
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &.active {
    background: white;
    color: var(--ajou-navy);
    font-weight: 600;
  }
`;

function Header() {
  const location = useLocation();

  const isActive = (path: string): string => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <HeaderContainer>
      <Title>Ajou Campus Foodmap</Title>
      <Nav>
        <NavLink to="/" className={isActive('/')}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/list" className={isActive('/list')}>
          <FaList /> List
        </NavLink>
        <NavLink to="/popular" className={isActive('/popular')}>
          <FaFire /> Popular Top 3
        </NavLink>
        <NavLink to="/submit" className={isActive('/submit')}>
          <FaPlus /> Submit New restaurant
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
