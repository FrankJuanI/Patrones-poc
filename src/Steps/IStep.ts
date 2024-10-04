import { ICustomer } from "../Models/ICustomer";

export interface IStep {
    execute: ({customer}: {customer: ICustomer}) => boolean
}