import { ICustomer } from "../Models/ICustomer"
import { IStep } from "./IStep"

export class AgeStep implements IStep{ // El AgeStep Se encarga de verificar que la edad del customer sea mayor a 18 años (a partir de la fecha de nacimiento)
    // runAgeStep({date}) {
    execute({customer}: {customer: ICustomer} ) {

        const currentTime = new Date()
        const customerDob = new Date(customer.dob)
        const MyDicc = {
            year: currentTime.getFullYear() - customerDob.getFullYear(),
            month: currentTime.getMonth() - customerDob.getMonth(),
            day: currentTime.getDate() - customerDob.getDate()
        }
        if (MyDicc.year > 18 || MyDicc.year === 18 && (MyDicc.month > 0 || ( MyDicc.month === 0 && MyDicc.day > 0))) {
            return true
        } 
        else {
            return false
        }
    }
}