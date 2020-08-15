import { Rezervacija } from './Rezervacija';

export class Korisnik {
    id: number;
    ime: string;
    prezime: string;
    godRodjenja: number;
    adresa: string;
    telefon: string;
    username: string;
    password: string;
    isAdmin: number;
    rezervacije: Rezervacija[];
    expiry: any;
}

