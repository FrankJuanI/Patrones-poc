import * as fs from 'fs';                          
import * as path from 'path';                      
import { ICustomer } from '../Models/ICustomer';

const directoryPath: string = path.join(__dirname, '../Steps');

export interface ICascadeExecution {
     execute: ({customer}: {customer: ICustomer}) =>  Promise<boolean>    
}

export class CascadeExecution implements ICascadeExecution{

    stepFactory: any;

    constructor({stepFactory}: {stepFactory: any}) {
        this.stepFactory = stepFactory;
    }

    async execute ({customer}: {customer: ICustomer}) {    
        let stepPassed: number = 0

        let files: string[] = await new Promise((resolve, reject) => {
            fs.readdir(directoryPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
                if (err) {
                    console.log('Error al leer el directorio: ' + err);
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });

        files.forEach(file => {
            if (file === 'IStep.js') return 
            const res = this.stepFactory.createStep(`${file.split('.')[0]}`);
            const stepRes = res.execute({customer: customer});
            if (!stepRes) console.log(`${file} rejected`);
            if (stepRes === true) {
                stepPassed ++
                console.log(`${file} approved`)
            }
        });
        
        return stepPassed === files.length;
        
    }
}




// const steps = ['Age', 'Edv', 'Idv']
// for (let step of steps) {
//     const res = this.stepFactory.createStep(`${step}`)
//     const stepRes = res.execute({customer: customer})
//     if (!stepRes) console.log(`${step} rejected`)
//     if (stepRes === true) console.log(`${step} approved`)
// }