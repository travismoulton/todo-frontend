import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AccordianTodos from '../AccordianTodos/AccordianTodos';

interface IProps {
  dueDate: 'Due Today' | 'Overdue';
}

export default function DueToday({ dueDate }: { dueDate: IProps['dueDate'] }) {
  return (
    <Accordion sx={{ width: '500px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{dueDate}</Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ padding: 0 }}>
        <AccordianTodos dueDate={dueDate} />
      </AccordionDetails>
    </Accordion>
  );
}
