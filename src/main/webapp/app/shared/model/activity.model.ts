import { Moment } from 'moment';
import { IChallenge } from 'app/shared/model/challenge.model';
import { ITag } from 'app/shared/model/tag.model';
import { IAgenda } from 'app/shared/model/agenda.model';

export interface IActivity {
  id?: number;
  name?: string;
  place?: string;
  startDate?: Moment;
  endDate?: Moment;
  points?: number;
  status?: string;
  challenge?: IChallenge;
  tags?: ITag[];
  agenda?: IAgenda;
}

export const defaultValue: Readonly<IActivity> = {};
