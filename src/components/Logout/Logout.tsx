import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '../../shared/store/authStore';
import { utils } from './logoutUtils';

const { logout } = utils;

export default function Logout() {
  const navigate = useNavigate();
  const { user, setUser } = useStore();

  useEffect(() => {
    if (user)
      (async () => {
        await logout();
        setUser(null);
        navigate('/');
      })();
  });

  return null;
}
