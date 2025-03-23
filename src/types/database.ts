export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IService {
  _id: string;
  title: string;
  owner: string;
  description: string;
  variants: string[];
  isActive: boolean;
  category: string;
}

export interface IServiceVariant {
  _id: string;
  employee: string;
  title: string;
  description: string;
  duration: number; // in minutes
  price: number; // rubles
  service: string;
  workingHours?: IWorkingHours;
}

export interface IWorkingHours {
  _id: string;
  variant: string;
  days: {
    start: Date;
    end: Date;
    breaks: {
      start: Date;
      end: Date;
    }[];
  }[];
}
export interface IBooking {
  _id: string;
  client: string;
  employee: string;
  service: string;
  serviceVariant: string;
  start: Date;
  end: Date;
  status: string;
}
