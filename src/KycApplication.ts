const appsettings = require('../appsettings.json')
const readline = require('readline');

import { StepFactory } from "./Factorys/StepFactory";
import { CascadeExecution } from "./Stratergys/Cascade";
import { VerificationNedded } from "./Stratergys/VerNeeded";

const {Customer} = require('./Models/Customer')

class Main {

    async InputCustomer () {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const question = (query: any) => {
            return new Promise((resolve) => rl.question(query, resolve));
        };

        function isDateValid(dateStr: any) {
            const newDate: any = new Date(dateStr)
            return !isNaN(newDate);
        }

        let customer = new Customer({ firstName: '', lastName: '', dob: '', idvStep: false });

        const firstName = await question('¿Nombre del customer? ');
        const lastName = await question('¿Apellido del customer? ');
        let dob 
        dob = await question('¿Fecha de nacimiento del customer? ');
        console.log("🚀 ~ Main ~ InputCustomer ~ dob:", dob)
        if  (dob !== '' && !isDateValid(dob)) {
            do {
                dob = await question('Escribi bien pelotudo: ');
            } while (!isDateValid(dob))
            }
        const idvStep = await question('¿idvApprove? ');

        customer = { firstName, lastName, dob, idvStep: idvStep === 'si' ? '001' : '002' };
        console.log( customer );

        rl.close();

        return customer
    }

    async execute() {
        const customer = await this.InputCustomer()

        const stepFactory = new StepFactory();
        const cascadeExecution = new CascadeExecution({ stepFactory: stepFactory });
        const verificationNedded = new VerificationNedded({ stepFactory: stepFactory });

        switch (appsettings.stratergy) {
            case ('VerificationNedded'):
                const verificationNeddedMode = await verificationNedded.execute({ customer: customer });
                if (verificationNeddedMode === true) console.log('🚀 ~ VerificationNedded Stratergy: Validation succesfully');
            case ('CascadeExecution'): 
                const executionMode = await cascadeExecution.execute({ customer: customer });
                if (executionMode) console.log('🚀 ~ CascadeExecution Stratergy: Validation succesfully');
            default: 
                throw new Error(`Strategy ${appsettings.stratergy} is not defined`);

        }
    }
}

const main = new Main();
main.execute()
