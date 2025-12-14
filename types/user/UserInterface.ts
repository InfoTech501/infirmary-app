import { Person } from '../person/PersonInterface';

export interface User {
    id: number;
    userId: number;
    username: string;
    password: string;
    lastLoginDate: Date;
    joinDate: Date;
    role: string;
    person: Person;
    autorities: string[];
    isActive: boolean;
    isLocked: boolean;
}
