import { Context, PIPE_CHAR } from '../models';

const expand = () => 'expand';
export const expandAssign = ({ sentence, commands }: Context) => ({
  sentence: sentence + PIPE_CHAR + expand(),
  commands: [...commands, { id: 'CMD-EXPAND' as const }],
});

const fieldsFlatten = () => 'fieldsFlatten';
export const fieldsFlattenAssign = ({ sentence, commands }: Context) => ({
  sentence: sentence + PIPE_CHAR + fieldsFlatten(),
  commands: [...commands, { id: 'CMD-FIELDS-FLATTEN' as const }],
});
