import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AccordianTodos from '../AccordianTodos/AccordianTodos';

interface IProps {
  dueDate: 'Due Today' | 'Overdue';
}

export default function DueToday({ dueDate }: { dueDate: IProps['dueDate'] }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{dueDate}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AccordianTodos />
      </AccordionDetails>
    </Accordion>
  );
}
