import { ICustomer } from "./ICustomer";

export class Customer implements ICustomer {

    firstName: string;
    lastName: string;
    dob: Date;
    idvStep: "001" | "002";

    constructor ({firstName, lastName, dob, idvStep}: ICustomer) { 
        this.firstName = firstName,
        this.lastName = lastName,
        this.dob = dob,
        this.idvStep = idvStep
    } 
}

export type CustomerProps =  Customer
