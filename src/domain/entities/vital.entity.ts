import {User} from './user.entity';

export interface Vital {
    id: string;

    timestamp: number;

    temp: string | null;

    isTempNormal: boolean | null;

    hr: number | null;

    isHrNormal: boolean | null;

    spo2: number | null;

    isSpo2Normal: boolean | null;

    rr: number | null;

    isRrNormal: boolean | null;

    fall: boolean | null;

    userId: string;

    thresholdsId: string;

    user: User;
}
