import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

interface IProps {
  isAuth: boolean;
}

export default function Navbar({ isAuth }: { isAuth: IProps['isAuth'] }) {
  return (
    <AppBar
      color="primary"
      sx={{
        height: '3rem',
        padding: '1rem 10rem',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      {!isAuth && <StyledLink to="/login">Login</StyledLink>}
      <StyledLink to="/add-todo">Add todo</StyledLink>
      {isAuth && <StyledLink to="/logout">Logout</StyledLink>}
    </AppBar>
  );
}
