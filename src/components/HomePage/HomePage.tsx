import { Box } from '@mui/material';
import { styled } from '@mui/material';

import { useStore } from '../../shared/store/authStore';
import DueToday from '../DueToday/DueToday';

const StyledBox = styled(Box)`
  margin-bottom: 10px;
`;

export default function HomePage() {
  const { user } = useStore();
  return (
    user && (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <StyledBox>
          <DueToday dueDate="Due Today" />
        </StyledBox>
        <StyledBox>
          <DueToday dueDate="Overdue" />
        </StyledBox>
      </Box>
    )
  );
}
