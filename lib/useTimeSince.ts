import { useInterval } from '@mantine/hooks';
import { useEffect, useState } from 'react';

function timeSince(date: Date) {
  var seconds = Math.floor((Date.now() - +date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }

  return Math.floor(seconds) + ' seconds';
}

export function useTimeSince(date: Date, interval = 1000) {
  const [formatted, setFormatted] = useState(timeSince(date));

  const { start, stop } = useInterval(() => {
    console.log('update');
    setFormatted(timeSince(date));
  }, interval);

  useEffect(() => {
    start();
    return stop;
  }, []);

  return formatted;
}
