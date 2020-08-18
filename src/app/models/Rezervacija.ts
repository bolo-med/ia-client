import { Automobil } from './Automobil';
import { Korisnik } from './Korisnik';

export class Rezervacija {

    id: number;
    korisnikID: number;
    automobilID: number;
    datumPreuzimanja: Date;
    datumVracanja: Date;
    realizovana: boolean;
    datumStvarnogVracanja: Date;
    automobil: Automobil;
    korisnik: Korisnik;
}