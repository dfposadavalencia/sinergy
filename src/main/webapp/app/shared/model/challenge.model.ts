import { IActivity } from 'app/shared/model/activity.model';

export interface IChallenge {
  id?: number;
  name?: string;
  purpose?: string;
  activities?: IActivity[];
}

export const defaultValue: Readonly<IChallenge> = {};
