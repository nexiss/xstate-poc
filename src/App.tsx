import './App.css';

import { useMachine } from '@xstate/react';

import { machine } from './machine/machine';

function App() {
  const [state, send] = useMachine(machine);

  return (
    <>
      <div>
        {state.value === 'EMPTY' && (
          <>
            <button
              onClick={() =>
                send({
                  type: 'FETCH',
                  sourceId: 'logs',
                })
              }
            >
              FETCH
            </button>
            <button
              onClick={() =>
                send({
                  type: 'TIMESERIES',
                  metric: 'avg(cpu.usage.percentage)',
                })
              }
            >
              TIMESERIES
            </button>
          </>
        )}

        {(state.value === 'FETCH' || state.value === 'TIMESERIES') && (
          <>
            <button
              onClick={() =>
                send({
                  type: 'CMD-LIMIT',
                  limit: 40,
                })
              }
            >
              CMD-LIMIT
            </button>
            <button
              onClick={() =>
                send({
                  type: 'CMD-FILTER',
                  field: 'myField',
                })
              }
            >
              CMD-FILTER
            </button>
            <button
              onClick={() =>
                send({
                  type: 'BUILD',
                })
              }
            >
              BUILD
            </button>
          </>
        )}
        {state.value === 'BUILT' && <>Sentence built:</>}
      </div>
      <div>{state.context.sentence}</div>
    </>
  );
}

export default App;
