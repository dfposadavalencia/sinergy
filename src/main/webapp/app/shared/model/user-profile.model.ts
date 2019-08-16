import { IAgenda } from 'app/shared/model/agenda.model';
import { ISeason } from 'app/shared/model/season.model';

export interface IUserProfile {
  id?: number;
  grade?: string;
  voice?: string;
  agenda?: IAgenda[];
  seasons?: ISeason[];
}

export const defaultValue: Readonly<IUserProfile> = {};
