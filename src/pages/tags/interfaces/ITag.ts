export interface ITag {
  id: number;
  title_ky: string;
  title_ru: string;
  title_en: string;
  active: boolean;
}

export type ITagCreate = Omit<ITag, 'id'>;
