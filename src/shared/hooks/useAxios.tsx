import { useState, useEffect } from 'react';

import axios from '../axios';

interface IProps {
  url: string;
  httpMethod: 'get' | 'post' | 'patch' | 'delete';
}

export default function useAxios({ url, httpMethod }: IProps) {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      setData(await axios[httpMethod](url));
    })();
  }, [httpMethod, url]);

  return data;
}
