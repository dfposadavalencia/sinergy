import { ITag } from 'app/shared/model/tag.model';

export interface IField {
  id?: number;
  name?: string;
  value?: string;
  tags?: ITag[];
}

export const defaultValue: Readonly<IField> = {};
