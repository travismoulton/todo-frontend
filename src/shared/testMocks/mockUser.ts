import { UserData, ErrorData } from '../../components/Register/registerUtils';

export const mockSuccessData: UserData = {
  status: 'success',
  data: {
    user: {
      name: 'Travis',
      __v: '1',
      id: '1',
      _id: '1',
      password: 'password',
    },
  },
};

export const mockFailedData: ErrorData = {
  status: 'fail',
  data: {
    message: 'Mock message',
  },
};
