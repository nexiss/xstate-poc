import { Context, PIPE_CHAR } from '../models';

const parse = (fieldName: string, pattern: string) =>
  `parse ${fieldName} ${pattern}`;
export const parseAssign = (
  { sentence, commands }: Context,
  field: string,
  pattern: string
) => ({
  sentence: sentence + PIPE_CHAR + parse(field, pattern),
  commands: [...commands, { id: 'CMD-PARSE' as const, field, pattern }],
});
