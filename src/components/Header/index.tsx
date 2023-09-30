import { NavLink } from 'react-router-dom';
import { Timer, Scroll } from 'phosphor-react';
import { HeaderContainer } from './styles';
import logoClock from '../../assets/logo.png';

export const Header = () => {
  return (
    <HeaderContainer>
      <img src={logoClock} alt="Bordas de um relógio na cor branca" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};
