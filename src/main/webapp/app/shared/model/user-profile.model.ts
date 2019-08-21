import { IUser } from 'app/shared/model/user.model';
import { IAgenda } from 'app/shared/model/agenda.model';
import { ISeason } from 'app/shared/model/season.model';
import { ITag } from 'app/shared/model/tag.model';

export interface IUserProfile {
  id?: number;
  grade?: string;
  voice?: string;
  discipline?: string;
  user?: IUser;
  agenda?: IAgenda[];
  seasons?: ISeason[];
  tags?: ITag[];
}

export const defaultValue: Readonly<IUserProfile> = {};
