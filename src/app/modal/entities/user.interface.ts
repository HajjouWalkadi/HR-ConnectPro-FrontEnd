import { Role } from '../entities/role.interface';

export interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  role: Role;
}