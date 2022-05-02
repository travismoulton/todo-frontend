import Typography from '@mui/material/Typography';
import { useStore } from '../../shared/store/authStore';

import DueToday from '../DueToday/DueToday';

export default function HomePage() {
  const { user } = useStore();
  return user && <DueToday dueDate="Due Today" />;
}
