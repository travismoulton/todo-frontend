import { ErrorMessage } from '@hookform/error-message';
import { Typography } from '@mui/material';

interface IProps {
  errors: { [x: string]: any };
  input: string;
}

export default function AuthFormInputError({ errors, input }: IProps) {
  const renderInputError = (message: string) => (
    <Typography
      variant="body1"
      component="p"
      sx={{
        color: '#ff4d4d',
        marginBottom: '10px',
      }}
    >
      {message}
    </Typography>
  );
  return (
    <ErrorMessage
      name={input}
      errors={errors}
      render={({ message }) => renderInputError(message)}
    />
  );
}
