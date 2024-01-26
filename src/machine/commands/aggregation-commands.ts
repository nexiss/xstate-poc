import { Context, PIPE_CHAR } from '../models';

const fieldsSummary = () => 'fieldsSummary';
export const fieldsSummaryAssign = ({ sentence, commands }: Context) => ({
  sentence: sentence + PIPE_CHAR + fieldsSummary(),
  commands: [...commands, { id: 'CMD-FIELDS-SUMMARY' as const }],
});

const makeTimeseries = () => 'makeTimeseries';
export const makeTimeseriesAssign = ({ sentence, commands }: Context) => ({
  sentence: sentence + PIPE_CHAR + makeTimeseries(),
  commands: [...commands, { id: 'CMD-MAKE-TIMESERIES' as const }],
});

const summarize = () => 'summarize';
export const summarizeAssign = ({ sentence, commands }: Context) => ({
  sentence: sentence + PIPE_CHAR + summarize(),
  commands: [...commands, { id: 'CMD-SUMMARIZE' as const }],
});
