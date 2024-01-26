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
            {/* -- FILTER --- */}
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
            {/* -- FILTER-OUT --- */}
            <button
              onClick={() =>
                send({
                  type: 'CMD-FILTER-OUT',
                  field: 'myField',
                })
              }
            >
              CMD-FILTER-OUT
            </button>
            {/* -- LIMIT --- */}
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
            {/* -- SORT --- */}
            <button
              onClick={() =>
                send({
                  type: 'CMD-SORT',
                  fields: [
                    { name: 'field1', direction: 'asc' },
                    { name: 'field2', direction: 'desc' },
                  ],
                })
              }
            >
              CMD-SORT
            </button>
            {/* -- BUILD --- */}
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
