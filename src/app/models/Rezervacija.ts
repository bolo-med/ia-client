import { Automobil } from './Automobil';

export class Rezervacija {

    id: number;
    korisnikID: number;
    automobilID: number;
    datumPreuzimanja: Date;
    datumVracanja: Date;
    realizovana: boolean;
    datumStvarnogVracanja: Date;
    automobil: Automobil;
    // korisnik: Korisnik;
}