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

export default function Navbar() {
  return (
    <AppBar
      color="secondary"
      sx={{
        height: '3rem',
        padding: '1rem 10rem',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <StyledLink to="/register">Login</StyledLink>
    </AppBar>
  );
}
