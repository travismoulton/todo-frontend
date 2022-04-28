import { useState, ComponentType } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import isSameDay from 'date-fns/isSameDay';
import { purple } from '@mui/material/colors';

type CustomPickerDayProps = PickersDayProps<Date> & {
  isSelectedDay: boolean;
};

interface IProps {
  setDate: (date: Date | null) => void;
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

export default function CustomDay({ setDate }: { setDate: IProps['setDate'] }) {
  const [value, setValue] = useState<Date | null>(new Date());

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
        onChange={(newValue) => {
          setValue(newValue);
          setDate(newValue);
        }}
        renderDay={renderPickerDay}
        renderInput={(params) => <TextField {...params} sx={{ ...formStyles }} />}
        label="Due Date"
      />
    </LocalizationProvider>
  );
}
