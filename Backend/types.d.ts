export interface Subscription {
    donorId: string;
    ngoId: string;
}

export interface Donation {
    donorId: string;
    ngoId: string;
    anonymity: boolean;
    message: string;
    donationType: number;
    honoredUserId: string;
    honoredUserName: string;
    date: object;
}

export interface Body {
    subscription?: Subscription;
    donation?: Donation;
}

declare namespace Express {
    export interface Request {
        body: Body
    }
}
