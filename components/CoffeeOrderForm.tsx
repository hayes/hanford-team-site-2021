import { Button, Group, Select, TextInput } from '@mantine/core';
import axios, { AxiosResponse } from 'axios';
import gql from 'graphql-tag';
import { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { useDrinkIngredientsQuery } from '../graphql/__generated__/operations.generated';
import { TypingSimulation } from './TypingSimulation';

gql`
  query drinkIngredients {
    drinkIngredients {
      id
      name
      max
      increment
      multiplier
      unit
      default
      pumps {
        enabled
      }
    }
  }
`;

const HOST = global.location?.host;

export function quantityOptions({
  max,
  increment,
  multiplier,
  unit,
}: {
  max: number;
  increment: number;
  multiplier: number;
  unit: string;
}) {
  const options: { label: string; value: string }[] = [{ value: '0', label: 'None' }];

  for (let i = increment; i <= max; i += increment) {
    const value = i / multiplier;
    options.push({
      value: String(i),
      label: `${value} ${unit}${value === 1 ? '' : 's'}`,
    });
  }

  return options;
}

export function CoffeeOrderForm() {
  const { data, error, loading } = useDrinkIngredientsQuery();
  const [name, setName] = useState('');
  const order = useRef(new Map<string, string>());
  const [command, setCommand] = useState('');
  const [orderId, setOrderId] = useState(0);

  const coffeeOrder = useMutation<
    unknown,
    unknown,
    {
      headers: Record<string, string>;
    }
  >({
    mutationFn: ({ headers }) => {
      return axios.post('/api/htcpcp', '', {
        headers,
        validateStatus: () => true,
      });
    },
    onSettled,
  });

  const teaOrder = useMutation({
    mutationFn: (data) => {
      return axios.post('/api/tea', {
        validateStatus: () => true,
      });
    },
    onSettled,
  });

  function onSettled(data: unknown, error: unknown) {
    const { status, statusText, data: responseText } = data as AxiosResponse<string>;
    console.log(data, error);

    const response = [
      '',
      `< HTCPCP/1.0 ${status} ${statusText}`,
      `< Content-Length: ${responseText.length}`,
      `<`,
      responseText,
      `* Closing connection 0`,
      '',
    ].join('\n');

    setCommand((prev) => prev + response);
  }

  useEffect(() => {
    if (data) {
      data.drinkIngredients.forEach((ingredient) => {
        order.current.set(ingredient.name, String(ingredient.default));
      });
    }
  }, [data]);

  if (error) {
    throw error;
  }

  if (!data || loading) {
    return null;
  }

  function placeOrder(endpoint: string) {
    const additions = [...order.current.entries()]
      .filter(([key, val]) => val !== '0')
      .map(([key, val]) => `${key};${val}`)
      .join(',');

    const orderCommand = [
      `> BREW /api${endpoint} HTCPCP/1.0`,
      `> HOST ${HOST}`,
      `> User-Agent: ${name}`,
      `> Content-Type:application/coffee-pot-command`,
      `> Accept-Additions:${additions}`,
      `>\n`,
    ].join('\n');

    setOrderId((prev) => prev + 1);
    setCommand(orderCommand);

    if (endpoint === '/htcpcp') {
      coffeeOrder.mutate({
        headers: {
          'Content-Type': 'application/coffee-pot-command',
          'Accept-Additions': additions,
          'Requested-By': name,
        },
      });
    } else {
      teaOrder.mutate();
    }
  }

  return (
    <>
      <form className="shadow-md my-4">
        <Group grow align="end">
          {data.drinkIngredients
            .filter(({ pumps }) => pumps.some(({ enabled }) => enabled))
            .map((ingredient) => (
              <div key={ingredient.id} className="min-w-[150px] !max-w-[inherit]">
                <Select
                  label={ingredient.name}
                  defaultValue={String(ingredient.default)}
                  data={quantityOptions(ingredient)}
                  onChange={(val) => order.current.set(ingredient.name, val)}
                />
              </div>
            ))}
          <div className="min-w-[250px] !max-w-[inherit]">
            <TextInput
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              label="Name"
              placeholder="Name for the drink order"
              required
            />
          </div>
        </Group>
        <div className="mt-4">
          <Group direction="row" position="right">
            <Button disabled={!!command || !name} onClick={() => placeOrder('/htcpcp')}>
              {command ? 'Order placed!' : 'Send to coffee Machine'}
            </Button>
            {!command && (
              <Button disabled={!!command || !name} onClick={() => placeOrder('/michael')}>
                {command ? 'Order placed!' : 'Send to Michael'}
              </Button>
            )}
          </Group>
        </div>
      </form>
      <pre className="bg-black text-green-400 p-4 my-8 border-gray-500 border-4 whitespace-pre-wrap">
        <TypingSimulation key={orderId} text={command} />
      </pre>
    </>
  );
}
