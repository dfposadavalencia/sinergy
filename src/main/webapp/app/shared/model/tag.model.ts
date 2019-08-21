import { IField } from 'app/shared/model/field.model';
import { IActivity } from 'app/shared/model/activity.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';

export interface ITag {
  id?: number;
  label?: string;
  fields?: IField[];
  activities?: IActivity[];
  users?: IUserProfile[];
}

export const defaultValue: Readonly<ITag> = {};
