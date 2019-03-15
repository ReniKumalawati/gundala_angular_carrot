import {Employee} from './employee';

export class Bazar {
  id: string;
  bazaarName: string;
  bazaarDescription: string;
  startPeriod: Date;
  endPeriod: Date;
  status: boolean;
  owner: Employee;
}
