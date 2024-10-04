import { ICustomer } from "../Models/ICustomer";


const myDicionario = {
    "sas": {color: 'red', value: 4},
    "sas2": "sas2",
    "sas3": "sas2",
    "sas4": "sas2"
}

myDicionario['sas'].color


export class VerificationNedded{
    
    stepFactory: any;

    constructor({stepFactory}: {stepFactory: any}) {
        this.stepFactory = stepFactory;
    }

    execute ({customer}: {customer: ICustomer}) {    
        
        if (customer) {
            const idvStep = this.stepFactory.createStep('IdvStep')
            const idvRes = idvStep.execute({customer: customer})
            if (idvRes) {
                let edvStep = this.stepFactory.createStep('EdvStep')
                var edvRes = edvStep.execute({customer: customer})
            }
            if (idvRes && edvRes) {
                const ageStep = this.stepFactory.createStep('AgeStep')
                const ageRes = ageStep.execute({customer: customer})
                if (ageRes) {
                    return true
                } else {
                    console.log('Customer validated but ageStep was denied')
                    return true
                }
            } else {
                throw new Error("Customer has not been validated")
            }

        } else {
            throw new Error('Customer doesnt exist')
        }

    }
}