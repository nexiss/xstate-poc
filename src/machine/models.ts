export type Operator = '==' | '!=';
export type Expression = string;
export type Alias = string;

// There could be a lot of different conditions
export type SingleConditioon = `${string} ${Operator} ${string}`;

export type Condition =
  | `${SingleConditioon} or ${SingleConditioon}`
  | `${SingleConditioon} and ${SingleConditioon}`;

export const PIPE_CHAR = ' | ';

export const FETCH_COMMAND = { id: 'FETCH' } as const;
export const TIMESERIES_COMMAND = { id: 'TIMESERIES' } as const;

export type Commands =
  | typeof FETCH_COMMAND
  | typeof TIMESERIES_COMMAND
  | { id: 'CMD-FILTER'; field: string }
  | { id: 'CMD-FILTER-OUT'; field: string }
  | { id: 'CMD-FIELDS'; fields: { alias?: Alias; expression: Expression }[] }
  | { id: 'CMD-FIELDS-ADD'; alias: Alias; expression: Expression }
  | { id: 'CMD-FIELDS-KEEP'; fields: string[] }
  | { id: 'CMD-FIELDS-REMOVE'; fields: string[] }
  | { id: 'CMD-FIELDS-RENAME'; fields: { new: string; old: string }[] }
  | { id: 'CMD-PARSE'; field: string; pattern: string }
  | { id: 'CMD-LIMIT'; limit: number }
  | {
      id: 'CMD-SORT';
      fields: { name: string; direction: 'asc' | 'desc' | undefined }[];
    }
  | { id: 'CMD-EXPAND' }
  | { id: 'CMD-FIELDS-FLATTEN' }
  | { id: 'CMD-FIELDS-SUMMARY' }
  | { id: 'CMD-MAKE-TIMESERIES' }
  | { id: 'CMD-SUMMARIZE' }
  | { id: 'CMD-APPEND' }
  | { id: 'CMD-JOIN' }
  | { id: 'CMD-LOOKUP' };

export type Context = {
  sentence: string;
  commands: Commands[];
};
