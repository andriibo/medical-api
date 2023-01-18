import {User} from './user.entity';

export interface Vital {
    id: string;

    timestamp: number;

    temperature: number | null;

    hr: number | null;

    spo: number | null;

    rr: number | null;

    fall: boolean | null;

    userId: string;

    user: User;
}
