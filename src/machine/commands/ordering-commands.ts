import { Context, PIPE_CHAR } from '../models';

const limit = (limit: number) => `limit ${limit}`;
export const limitAssign = (
  { sentence, commands }: Context,
  limitValue: number
) => ({
  sentence: sentence + PIPE_CHAR + limit(limitValue),
  commands: [...commands, { id: 'CMD-LIMIT' as const, limit: limitValue }],
});

export type SortDirection = 'asc' | 'desc';

const sort = (
  fields: { name: string; direction: SortDirection | undefined }[]
) =>
  `sort ${fields
    .map((field) => `${field.name} ${field.direction ?? ''}`.trimEnd())
    .join(', ')}`;
export const sortAssign = (
  { sentence, commands }: Context,
  fields: { name: string; direction: SortDirection | undefined }[]
) => ({
  sentence: sentence + PIPE_CHAR + sort(fields),
  commands: [...commands, { id: 'CMD-SORT' as const, fields }],
});
