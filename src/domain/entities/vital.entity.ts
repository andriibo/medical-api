import {User} from './user.entity';

export interface Vital {
    vitalId: string;

    timestamp: number;

    temperature: number;

    hr: number;

    spo: number;

    rr: number;

    fall: boolean;

    userId: string;

    user: User;
}
