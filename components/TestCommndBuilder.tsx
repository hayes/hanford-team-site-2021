import { Button, Checkbox, NumberInput } from '@mantine/core';
import gql from 'graphql-tag';
import { useRef, useState } from 'react';
import { useQueueCommandMutation } from '../graphql/__generated__/operations.generated';
import { Pump } from './PumpConfigRow';

gql`
  mutation queueCommand($command: String!) {
    addTestOrder(command: $command) {
      id
      name
    }
  }
`;

export function TestCommandBuilder({ pumps }: { pumps: Pump[] }) {
  const [steps, setSteps] = useState<{ pins: number[]; duration: number }[]>([]);
  const pins = useRef(new Set<number>());
  const [duration, setDuration] = useState(1000);
  const [addCommand] = useQueueCommandMutation({
    onCompleted: () => setSteps([]),
  });

  return (
    <div>
      <NumberInput label="duration" value={duration} onChange={(val) => setDuration(val)} />

      {[...pumps]
        .sort((a, b) => a.pin - b.pin)
        .map((pump) => (
          <Checkbox
            key={pump.id}
            label={`Pin ${pump.pin}`}
            onChange={(ev) => {
              ev.target.checked ? pins.current.add(pump.pin) : pins.current.delete(pump.pin);
            }}
          />
        ))}

      <Button
        onClick={() => {
          setSteps((prev) => [
            ...prev,
            {
              duration,
              pins: [...pins.current],
            },
          ]);
        }}
      >
        Add step
      </Button>
      <h3 className="text-lg">Steps</h3>
      <ol className="list-decimal">
        {steps.map((step, i) => (
          <li key={i}>
            {step.duration}: {step.pins.join(', ')}
          </li>
        ))}
      </ol>

      <Button
        onClick={() => {
          addCommand({
            variables: {
              command: JSON.stringify({
                steps: steps.map((step) => ({
                  duration: step.duration,
                  pins: step.pins.map((pin) => ({
                    pin,
                    mode: 1,
                    level: 0,
                  })),
                })),
              }),
            },
          });
        }}
      >
        Queue command
      </Button>
    </div>
  );
}
