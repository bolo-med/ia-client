import { Status } from './Status';
import { Proizvodjac } from './Proizvodjac';
import { Model } from './Model';
import { Rezervacija } from './Rezervacija';

export class Automobil {

    id: number;
    proizvodjacID: number;
    modelID: number;
    godiste: number;
    motor: string;
    mjenjac: string;
    statusID: number;
    fotografija: string;
    cijena: number;
    status: Status;
    proizvodjac: Proizvodjac;
    model: Model;
    rezervacije: Rezervacija[];

}

