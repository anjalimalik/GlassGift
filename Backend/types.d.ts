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
    frequency: number;
}

export interface PaymentMethod {
    userId: string;
    address: string;
    ccNumber: number;
    cvv: number;
    expirationDate: Date;
    ccName: string;
}

export interface Body {
    subscription?: Subscription;
    donation?: Donation;
    paymentMethod?: PaymentMethod;
}

export interface DecodedToken {
    id: string;
}

declare namespace Express {
    export interface Request {
        body: Body;
        decodedToken: DecodedToken;
    }
}
