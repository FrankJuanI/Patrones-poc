import { ICustomer } from "../Models/ICustomer"
import { IStep } from "./IStep"

export class IdvStep implements IStep {
    // runIdvStep ({value}) {
    execute ({customer}: {customer: ICustomer}) {
        if (customer.idvStep === '001') return true
        if (customer.idvStep === '002') return false
        return false
    }
}