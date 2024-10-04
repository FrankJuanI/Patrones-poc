// const EdvStep = require('../Steps/EdvStep')
// const IdvStep = require('../Steps/IdvStep')
// const AgeStep = require('../Steps/AgeStep')

import { EdvStep } from "../Steps/EdvStep";
import { IdvStep } from "../Steps/IdvStep";
import { AgeStep } from "../Steps/AgeStep";


export class StepFactory {
    createStep(stepName: String) {      
      switch (stepName) {
        case 'AgeStep':
          return new AgeStep();
        case 'EdvStep':
          return new EdvStep();
        case 'IdvStep':
          return new IdvStep();
        default:
          throw new Error(`Step "${stepName}" not recognized`);
      }
    }
}