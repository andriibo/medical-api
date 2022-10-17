import {User} from './user.entity';

export interface Vital {
    id: string;

    timestamp: number;

    temperature: number;

    hr: number;

    spo: number;

    pr: number;

    fall: boolean;

    userId: string;

    user: User;
}
