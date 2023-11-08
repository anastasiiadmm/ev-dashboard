export interface ITag {
  id: number;
  tag_ky: string;
  tag_ru: string;
  tag_en: string;
  active: boolean;
}

export interface ITagCreate {
  active: boolean;
}
