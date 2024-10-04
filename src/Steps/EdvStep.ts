import { ICustomer } from "../Models/ICustomer"
import { IStep } from "./IStep"

export class EdvStep implements IStep{ // return MC=1000 si la data del customer es correcta y un MC=0 si la data del customer es incorrecta (firstname, lastname y dob para el customer).
    // runEdvStep ({firstName, lastName, dob}) { 
    execute ({customer}: {customer: ICustomer}) {
        if (customer.firstName && customer.lastName && customer.dob) return true
        return false
    }
}