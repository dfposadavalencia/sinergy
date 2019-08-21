import { Moment } from 'moment';
import { IUserProfile } from 'app/shared/model/user-profile.model';

export interface ISeason {
  id?: number;
  name?: string;
  startDate?: Moment;
  endDate?: Moment;
  users?: IUserProfile[];
}

export const defaultValue: Readonly<ISeason> = {};
