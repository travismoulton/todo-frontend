import { useState, ComponentType } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import isSameDay from 'date-fns/isSameDay';

import { utils } from '../../shared/utils';

const { generateDateStr } = utils;

type CustomPickerDayProps = PickersDayProps<Date> & {
  isSelectedDay: boolean;
};

interface IProps {
  setDateStr: (date: number) => void;
  setDate: (date: Date) => void;
  defaultDate?: Date;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelectedDay',
})<CustomPickerDayProps>(({ theme, isSelectedDay }) => ({
  ...(isSelectedDay && {
    backgroundColor: theme.palette.primary.dark,

    color: theme.palette.common.white,
    '&:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
})) as ComponentType<CustomPickerDayProps>;

export default function CustomDay({ setDate, setDateStr, defaultDate }: IProps) {
  const [value, setValue] = useState<Date | null>(defaultDate || new Date());

  const renderPickerDay = (
    date: Date,
    _selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const isSelectedDay = isSameDay(date, value);
    isSelectedDay && console.log(date);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        isSelectedDay={isSelectedDay}
        selected={false}
      />
    );
  };

  const formStyles = { width: '75%', marginBottom: '25px' };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        onChange={(date) => {
          // The date will be store in the database as an integer for easy look up on based
          // due today / overdue

          setValue(date);
          setDateStr(generateDateStr(date as Date));
          setDate(date as Date);
        }}
        renderDay={renderPickerDay}
        renderInput={(params) => <TextField {...params} sx={{ ...formStyles }} />}
        label="Due Date"
      />
    </LocalizationProvider>
  );
}
