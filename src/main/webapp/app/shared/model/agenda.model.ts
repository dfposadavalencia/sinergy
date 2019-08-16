import { IUserProfile } from 'app/shared/model/user-profile.model';
import { IActivity } from 'app/shared/model/activity.model';

export interface IAgenda {
  id?: number;
  attendance?: boolean;
  activityScoring?: number;
  moderatorScoring?: number;
  userProfile?: IUserProfile;
  activities?: IActivity[];
}

export const defaultValue: Readonly<IAgenda> = {
  attendance: false
};
