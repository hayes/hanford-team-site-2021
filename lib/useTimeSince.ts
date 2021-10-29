import { useInterval } from '@mantine/hooks';
import { useEffect, useState } from 'react';

function format(n: number, unit: string) {
  const rounded = Math.floor(n);

  if (rounded === 1) {
    return `${rounded} ${unit} ago`;
  }

  return `${rounded} ${unit}s ago`;
}

function timeSince(date: Date) {
  var seconds = Math.floor((Date.now() - +date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return format(interval, 'year');
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return format(interval, 'month');
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return format(interval, 'day');
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return format(interval, 'hour');
  }
  interval = seconds / 60;
  if (interval > 1) {
    return format(interval, 'minute');
  }

  return format(seconds, 'second');
}

export function useTimeSince(date: Date, interval = 1000) {
  const [formatted, setFormatted] = useState(timeSince(date));

  const { start, stop } = useInterval(() => {
    setFormatted(timeSince(date));
  }, interval);

  useEffect(() => {
    start();
    return stop;
  }, []);

  return formatted;
}
