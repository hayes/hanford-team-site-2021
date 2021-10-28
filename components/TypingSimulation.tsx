import { ReactNode, useEffect, useRef, useState } from 'react';
import { CursorBlink } from './CursorBlink';

function duration(target: number, jitter: number) {
  return target + (Math.random() * (jitter * 2) - jitter);
}

export function TypingSimulation({ text }: { text: string }) {
  const [lines, setLines] = useState<ReactNode[]>(['']);
  const index = useRef(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    typeMore(100);

    function typeMore(interval: number) {
      timer = setTimeout(() => {
        if (index.current >= text.length) {
          return;
        }

        const nextChar = text[index.current++];

        if (nextChar === '\n') {
          setLines((oldLines) => [...oldLines, <br key={`br-${oldLines.length}`} />, '']);

          typeMore(duration(300, 50));
          return;
        }

        setLines((oldLines) => [
          ...oldLines.slice(0, -1),
          `${oldLines[oldLines.length - 1]}${nextChar}`,
        ]);

        const slowChars = [':', ';', ',', ' '];
        typeMore(duration(slowChars.includes(nextChar) ? 500 : 50, 50));
      }, interval);
    }

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <>
      {lines}
      <CursorBlink />
    </>
  );
}
