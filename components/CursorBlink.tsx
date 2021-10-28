import { useBlink } from '../lib/useBlink';

export function CursorBlink() {
  const on = useBlink(700);

  return <span className={on ? 'bg-green-400' : ''}> </span>;
}
