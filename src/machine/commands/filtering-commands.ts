import { Condition, Context, PIPE_CHAR } from '../models';

const filter = (condition: Condition) => 'filter ' + condition;
export const filterAssign = (
  { sentence, commands }: Context,
  field: string
) => ({
  sentence: sentence + PIPE_CHAR + filter(('by{' + field + '}') as Condition),
  commands: [...commands, { id: 'CMD-FILTER' as const, field }],
});

const filterOut = (condition: Condition) => 'filterOut ' + condition;
export const filterOutAssign = (
  { sentence, commands }: Context,
  field: string
) => ({
  sentence:
    sentence + PIPE_CHAR + filterOut(('by{' + field + '}') as Condition),
  commands: [...commands, { id: 'CMD-FILTER-OUT' as const, field }],
});
