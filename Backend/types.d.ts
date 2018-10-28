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

export interface PaymentMethod {

}

export interface Body {
    subscription?: Subscription;
    donation?: Donation;
    paymentMethod?: PaymentMethod;
}

declare namespace Express {
    export interface Request {
        body: Body
    }
}
