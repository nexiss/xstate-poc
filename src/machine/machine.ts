import { assign, createMachine, log } from 'xstate';

import {
  fieldsSummaryAssign,
  makeTimeseriesAssign,
  summarizeAssign,
} from './commands/aggregation-commands';
import {
  appendAssign,
  joinAssign,
  lookupAssign,
} from './commands/correlation-and-join-commands';
import { parseAssign } from './commands/extraction-and-parsing-commands';
import { filterAssign, filterOutAssign } from './commands/filtering-commands';
import {
  limitAssign as limitAssign,
  sortAssign as sortAssign,
} from './commands/ordering-commands';
import {
  fieldsAddAssign,
  fieldsAssign,
  fieldsKeepAssign,
  fieldsRemoveAssign,
  fieldsRenameAssign,
} from './commands/selection-and-modification-commands';
import {
  expandAssign,
  fieldsFlattenAssign,
} from './commands/structuring-commands';
import { Commands, Context, FETCH_COMMAND, TIMESERIES_COMMAND } from './models';

const onCommandsEvents = {
  'CMD-FILTER': {
    actions: 'CMD-FILTER',
  },
  'CMD-FILTER-OUT': {
    actions: 'CMD-FILTER-OUT',
  },
  'CMD-FIELDS': {
    actions: 'CMD-FIELDS',
  },
  'CMD-FIELDS-ADD': {
    actions: 'CMD-FIELDS-ADD',
  },
  'CMD-FIELDS-KEEP': {
    actions: 'CMD-FIELDS-KEEP',
  },
  'CMD-FIELDS-REMOVE': {
    actions: 'CMD-FIELDS-REMOVE',
  },
  'CMD-FIELDS-RENAME': {
    actions: 'CMD-FIELDS-RENAME',
  },
  'CMD-PARSE': {
    actions: 'CMD-PARSE',
  },
  'CMD-LIMIT': {
    actions: 'CMD-LIMIT',
  },
  'CMD-SORT': {
    actions: 'CMD-SORT',
  },
  'CMD-EXPAND': {
    actions: 'CMD-EXPAND',
  },
  'CMD-FIELDS-FLATTEN': {
    actions: 'CMD-FIELDS-FLATTEN',
  },
  'CMD-MAKE-TIMESERIES': {
    actions: 'CMD-MAKE-TIMESERIES',
  },
  'CMD-FIELDS-SUMMARY': {
    actions: 'CMD-FIELDS-SUMMARY',
  },
  'CMD-SUMMARIZE': {
    actions: 'CMD-SUMMARIZE',
  },
  'CMD-APPEND': {
    actions: 'CMD-APPEND',
  },
  'CMD-JOIN': {
    actions: 'CMD-JOIN',
  },
  'CMD-LOOKUP': {
    actions: 'CMD-LOOKUP',
  },
};

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBECKAZAtAIQK4EsAbCMAJwDoBRAWQAUAVATQGIAxS+gYQAkBtABgC6iUAAcA9rHwAXfOIB2IkAA9EAdgBs5ABwaATAFY1AZgAsATgPm12vWoA0IAJ6JMARgNvybizc9GNTXM9AF8QxzQsPCISChoGFnoASWpKAGVKACUk9IFhJBAJKVkFJVUEDStyNX5+Nw1jcw0m7W1TRxcEd09vX21-TSDQ8JBInAJiMnJ2Lm5mTmpkTHQUpPo8pSKZOUUC8vdjY2rTYzU3PQtTNzUajQ7EfmqfOr0GvX5tfjUrDTCIjHGMSmMx480WmFYSXQ9CyGwKWxKu1A5TcH3I1k8-DsBg0tnMh3uCDcHnIxgM-BOlVa51MGjcf1GAOikwoILm2AAqlDkHCxJJtqU9og9Kdqt9+JU1KYRaYDAZCe5yAZfNZDFK3E0rgyxszYuRkqkMtl0mClitqGteYV+Yiyoh+npquSPliJfULArzqSpVKrFY9D4Gr8RjqJnqDeksjk0qaIVCYZkrQidnaKuZHmZzFmzpptE1CT5HYZ+MYPNoznp025tNqmWGphGjdHmJzuUmbSmhQgDCL0c7jPobsqLp6lSq1Gqrk1XjWGfJxCR4AVQ0DSJsO4Lka5q14pacaeYrjcJQrjHZyBdrDU7K1Ag1a1F63E6Ex18VO1uEI0jnTWocS98rzys4rgiuY6K+Gcg7SnYxgPoCLLTBwPBvgKSIqIg5I6LU-AGLohhyvwh53CBXRmL0V7GLombWE08G6g2KSRsaaSobaXaVI6GKBj2eiVh4CqGKSKqfKYZzaMSgT0U+5CttCbEfhhX4mNUpx4aipgWL+DikR4RyEacWIaBoAFwWEIRAA */
    id: 'DQL-Builder',
    initial: 'EMPTY',
    types: {} as {
      context: Context;
    },
    context: {
      sentence: '',
      commands: [] as Commands[],
    },
    states: {
      EMPTY: {
        on: { FETCH: 'FETCH', TIMESERIES: 'TIMESERIES' },
      },
      FETCH: {
        // entry actions
        entry: assign(({ event }) => ({
          sentence: 'fetch ' + event.sourceId,
          commands: [FETCH_COMMAND],
        })),
        on: { ...onCommandsEvents, BUILD: 'BUILT' },
      },
      TIMESERIES: {
        entry: assign(({ event }) => ({
          sentence: 'timeseries ' + event.metric,
          commands: [TIMESERIES_COMMAND],
        })),
        on: { ...onCommandsEvents, BUILD: 'BUILT' },
      },
      BUILT: {
        entry: log(({ context }) => context.sentence),
        type: 'final',
      },
    },
  },
  {
    actions: {
      'CMD-FILTER': assign(({ event, context }) =>
        filterAssign(context, 'by{' + event.field + '}')
      ),
      'CMD-FILTER-OUT': assign(({ event, context }) =>
        filterOutAssign(context, 'by{' + event.field + '}')
      ),
      'CMD-FIELDS': assign(({ event, context }) =>
        fieldsAssign(context, event.fields)
      ),
      'CMD-FIELDSADD': assign(({ event, context }) =>
        fieldsAddAssign(context, {
          alias: event.alias,
          expression: event.expression,
        })
      ),
      'CMD-FIELDS-KEEP': assign(({ event, context }) =>
        fieldsKeepAssign(context, event.fields)
      ),
      'CMD-FIELDS-REMOVE': assign(({ event, context }) =>
        fieldsRemoveAssign(context, event.fields)
      ),
      'CMD-FIELDS-RENAME': assign(({ event, context }) =>
        fieldsRenameAssign(context, event.fields)
      ),
      'CMD-FIELDS-PARSE': assign(({ event, context }) =>
        parseAssign(context, event.field, event.pattern)
      ),
      'CMD-LIMIT': assign(({ event, context }) =>
        limitAssign(context, event.limit)
      ),
      'CMD-SORT': assign(({ event, context }) =>
        sortAssign(context, event.fields)
      ),
      'CMD-EXPAND': assign(({ context }) => expandAssign(context)),
      'CMD-FIELDS-FLATTEN': assign(({ context }) =>
        fieldsFlattenAssign(context)
      ),
      'CMD-FIELDS-SUMMARY': assign(({ context }) =>
        fieldsSummaryAssign(context)
      ),
      'CMD-MAKE-TIMESERIES': assign(({ context }) =>
        makeTimeseriesAssign(context)
      ),
      'CMD-SUMMARIZE': assign(({ context }) => summarizeAssign(context)),
      'CMD-APPEND': assign(({ context }) => appendAssign(context)),
      'CMD-JOIN': assign(({ context }) => joinAssign(context)),
      'CMD-LOOKUP': assign(({ context }) => lookupAssign(context)),
    },
  }
);
