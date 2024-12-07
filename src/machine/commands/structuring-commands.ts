import { Context, PIPE_CHAR } from '../models';

const expand = (limit: number) => 'expand ..., limit:' + limit;
export const expandAssign = (
  { sentence, commands }: Context,
  limit: number
) => ({
  sentence: sentence + PIPE_CHAR + expand(limit),
  commands: [...commands, { id: 'CMD-EXPAND' as const }],
});

const fieldsFlatten = (prefix: string) => 'fieldsFlatten ..., prefix:' + prefix;
export const fieldsFlattenAssign = (
  { sentence, commands }: Context,
  prefix: string
) => ({
  sentence: sentence + PIPE_CHAR + fieldsFlatten(prefix),
  commands: [...commands, { id: 'CMD-FIELDS-FLATTEN' as const }],
});
