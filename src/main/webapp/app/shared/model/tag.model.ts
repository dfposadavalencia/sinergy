import { IField } from 'app/shared/model/field.model';
import { IActivity } from 'app/shared/model/activity.model';

export interface ITag {
  id?: number;
  label?: string;
  fields?: IField[];
  activities?: IActivity[];
}

export const defaultValue: Readonly<ITag> = {};
