import { Context, PIPE_CHAR } from '../models';

const append = () => 'append';
export const appendAssign = ({ sentence, commands }: Context) => ({
  sentence: sentence + PIPE_CHAR + append(),
  commands: [...commands, { id: 'CMD-APPEND' as const }],
});

const join = () => 'join';
export const joinAssign = ({ sentence, commands }: Context) => ({
  sentence: sentence + PIPE_CHAR + join(),
  commands: [...commands, { id: 'CMD-JOIN' as const }],
});

const lookup = () => 'lookup';
export const lookupAssign = ({ sentence, commands }: Context) => ({
  sentence: sentence + PIPE_CHAR + lookup(),
  commands: [...commands, { id: 'CMD-LOOKUP' as const }],
});
