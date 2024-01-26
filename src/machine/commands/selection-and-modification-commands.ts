import { Alias, Context, Expression, PIPE_CHAR } from '../models';

const fieldAssignation = (before: string, after: string) =>
  before + ' = ' + after;

const fields = (fields: { alias?: Alias; expression: Expression }[]) =>
  `fields ${fields.map((field) =>
    typeof field.alias === 'string'
      ? fieldAssignation(field.alias, field.expression)
      : field.expression
  )}`;
export const fieldsAssign = (
  { sentence, commands }: Context,
  fieldsOptions: { alias?: Alias; expression: Expression }[]
) => ({
  sentence: sentence + PIPE_CHAR + fields([]),
  commands: [...commands, { id: 'CMD-FIELDS' as const, fields: fieldsOptions }],
});

const fieldsAdd = (alias: Alias, expression: Expression) =>
  'fieldsAdd ' + fieldAssignation(alias, expression);
export const fieldsAddAssign = (
  { sentence, commands }: Context,
  { alias, expression }: { alias: Alias; expression: Expression }
) => ({
  sentence: sentence + PIPE_CHAR + fieldsAdd(alias, expression),
  commands: [...commands, { id: 'CMD-FIELDS-ADD' as const, alias, expression }],
});

const fieldsKeep = (fields: string[]) => `fieldsKeep ${fields.join(', ')}`;
export const fieldsKeepAssign = (
  { sentence, commands }: Context,
  fieldsOptions: string[]
) => ({
  sentence: sentence + PIPE_CHAR + fieldsKeep(fieldsOptions),
  commands: [
    ...commands,
    { id: 'CMD-FIELDS-KEEP' as const, fields: fieldsOptions },
  ],
});

const fieldsRemove = (fields: string[]) => `fieldsRemove ${fields.join(', ')}`;
export const fieldsRemoveAssign = (
  { sentence, commands }: Context,
  fieldsOptions: string[]
) => ({
  sentence: sentence + PIPE_CHAR + fieldsRemove(fieldsOptions),
  commands: [
    ...commands,
    { id: 'CMD-FIELDS-REMOVE' as const, fields: fieldsOptions },
  ],
});

const fieldsRename = (fields: { new: string; old: string }[]) =>
  `fieldsRename ${fields.map((field) =>
    fieldAssignation(field.new, field.old)
  )}`;

export const fieldsRenameAssign = (
  { sentence, commands }: Context,
  fieldsOptions: { new: string; old: string }[]
) => ({
  sentence: sentence + PIPE_CHAR + fieldsRename(fieldsOptions),
  commands: [
    ...commands,
    { id: 'CMD-FIELDS-RENAME' as const, fields: fieldsOptions },
  ],
});
