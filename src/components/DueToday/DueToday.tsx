import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';

import { utils } from '../AccordianTodos/accordianTodosUtils';

export default function DueToday() {
  useEffect(() => {
    (async () => {
      utils.fetchTodos();
    })();
  }, []);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <p>Accordian</p>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          <li>
            <p>1</p>
          </li>
          <li>
            <p>1</p>
          </li>
          <li>
            <p>1</p>
          </li>
          <li>
            <p>1</p>
          </li>
        </ul>
      </AccordionDetails>
    </Accordion>
  );
}
