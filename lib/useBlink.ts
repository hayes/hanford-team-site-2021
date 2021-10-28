import { useEffect, useState } from 'react';

export function useBlink(duration: number = 1000) {
  const [on, setState] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    toggle();

    function toggle() {
      timer = setTimeout(() => {
        setState((val) => !val);
        toggle();
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [duration]);
  return on;
}
