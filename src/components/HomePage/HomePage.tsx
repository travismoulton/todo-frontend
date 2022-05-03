import { Box } from '@mui/material';

import { useStore } from '../../shared/store/authStore';
import HomePageAccordian from '../HomePageAccordian/HomePageAccordian';

export default function HomePage() {
  const { user } = useStore();
  return (
    user && (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ marginBottom: '10px' }}>
          <HomePageAccordian dueDate="Due Today" />
        </Box>
        <Box sx={{ marginBottom: '10px' }}>
          <HomePageAccordian dueDate="Overdue" />
        </Box>
      </Box>
    )
  );
}
