import { assign, createMachine, log } from 'xstate';

const onCommands = {
  'CMD-LIMIT': {
    actions: 'CMD-LIMIT',
  },
  'CMD-FILTER': {
    actions: 'CMD-FILTER',
  },
};

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBECKAZAtAIQK4EsAbCMAJwDoBRAWQAUAVATQGIAxS+gYQAkBtABgC6iUAAcA9rHwAXfOIB2IkAA9EAdgBs5ABwaATAFY1AZgAsATgPm12vWoA0IAJ6JMARgNvybizc9GNTXM9AF8QxzQsPCISChoGFnoASWpKAGVKACUk9IFhJBAJKVkFJVUEDStyNX5+Nw1jcw0m7W1TRxcEd09vX21-TSDQ8JBInAJiMnJ2Lm5mTmpkTHQUpPo8pSKZOUUC8vdjY2rTYzU3PQtTNzUajQ7EfmqfOr0GvX5tfjUrDTCIjHGMSmMx480WmFYSXQ9CyGwKWxKu1A5TcH3I1k8-DsBg0tnMh3uCDcHnIxgM-BOlVa51MGjcf1GAOikwoILm2AAqlDkHCxJJtqU9og9Kdqt9+JU1KYRaYDAZCe5yAZfNZDFK3E0rgyxszYuRkqkMtl0mClitqGteYV+Yiyoh+npquSPliJfULArzqSpVKrFY9D4Gr8RjqJnqDeksjk0qaIVCYZkrQidnaKuZHmZzFmzpptE1CT5HYZ+MYPNoznp025tNqmWGphGjdHmJzuUmbSmhQgDCL0c7jPobsqLp6lSq1Gqrk1XjWGfJxCR4AVQ0DSJsO4Lka5q14pacaeYrjcJQrjHZyBdrDU7K1Ag1a1F63E6Ex18VO1uEI0jnTWocS98rzys4rgiuY6K+Gcg7SnYxgPoCLLTBwPBvgKSIqIg5I6LU-AGLohhyvwh53CBXRmL0V7GLombWE08G6g2KSRsaaSobaXaVI6GKBj2eiVh4CqGKSKqfKYZzaMSgT0U+5CttCbEfhhX4mNUpx4aipgWL+DikR4RyEacWIaBoAFwWEIRAA */
    id: 'DQL-Builder',
    initial: 'EMPTY',
    context: {
      sentence: '',
    },
    states: {
      EMPTY: {
        on: { FETCH: 'FETCH', TIMESERIES: 'TIMESERIES' },
      },
      FETCH: {
        // entry actions
        entry: assign({
          sentence: ({ event }) => 'fetch ' + event.sourceId,
        }),
        on: { ...onCommands, BUILD: 'BUILT' },
      },
      TIMESERIES: {
        entry: assign({
          sentence: ({ event }) => 'timeseries ' + event.metric,
        }),
        on: { ...onCommands, BUILD: 'BUILT' },
      },
      BUILT: {
        entry: log(({ context }) => context.sentence),
        type: 'final',
      },
    },
  },
  {
    actions: {
      'CMD-LIMIT': assign({
        sentence: ({ event, context }) => {
          return context.sentence + ' | limit ' + event.limit;
        },
      }),
      'CMD-FILTER': assign({
        sentence: ({ event, context }) => {
          return context.sentence + ' | filter by:{' + event.field + '}';
        },
      }),
    },
  }
);
