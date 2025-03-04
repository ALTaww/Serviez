export interface IUsers {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export interface IServices {
  id: number;
  creator_id: number;
  name: string;
  price: number;
  description: string;
  time_doing_min: number;
}
