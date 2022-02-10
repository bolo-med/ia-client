# Aplikacija za iznajmljivanje automobila

Aplikacija se sastoji iz [klijentskog](https://github.com/bolo-med/ia-client) (Angular) i [serverskog](https://github.com/bolo-med/iznajmljivanje_automobila) (Node.js) dijela. Podaci se skladište u MySQL bazi podataka. Sledeće slike pokazuju rad aplikacije.

## Stranice dostupne svim posjetiocima

![01.png](/docs/assets/images/01.png)
*Slika 1 - Početna stranica. Prikazani su svi automobili u ponudi, sa osnovnim informacijama i mogucnošću za filtriranje.*

![02.png](/docs/assets/images/02.png)
*Slika 2 - Primjer filtriranja po proizvođaču, tipu mjenjača i broju mjesta za putnike.*

## Stranice dostupne prijavljenim posjetiocima, sa običnim pravima

![03.png](/docs/assets/images/03.png)
*Slika 3 - Stranica za rezervaciju automobila.*

![04.png](/docs/assets/images/04.png)
*Slika 4 - Na stranici Korisnik/Aktuelno, korisnik može pogledati automobile koje je rezervisao i/ili iznajmio.*

![05.png](/docs/assets/images/05.png)
*Slika 5 - Na stranici Korisnik/Istorija, korisnik može pogledati automobile koje je iznajmio ili odustao od rezervacije.*

## Stranice dostupne prijavljenim posjetiocima, sa administratorskim pravima

![06.png](/docs/assets/images/06.png)
*Slika 6 - Na stranici Administrator/Automobili, opcija - Dodaj automobil, proizvođača, model i/ili status, korisniku su dostupne forme za unos novih podataka.*

![07.png](/docs/assets/images/07.png)
*Slika 7 - Na stranici Administrator/Automobili, opcija - Izmijeni/ukloni  automobil, korisnik može da izmijeni podatke o automobilu, ili da ukloni automobil.*

![08.png](/docs/assets/images/08.png)
*Slika 8 - Na stranici Administrator/Automobili, opcija - Izmijeni/Ukloni proizvođača, model i/ili status, korisnik može da izmijeni podatke o proizvođaču, modelu i statusu, ili da ih ukloni.*

![09.png](/docs/assets/images/09.png)
*Slika 9 - Na stranici Administrator/Korisnici je spisak svih korisnika. Klikom na dugme "Detaljnije", dobija se više detalja o korisniku, kao i neke dodatne opcije.*

![10.png](/docs/assets/images/10.png)
*Slika 10 - Odabirom korisnika sa spiska, dobijaju se dodatni detalji. Moguće je promijeniti prava korisnika, resetovati lozinku i ukloniti korisnika.*

![11.png](/docs/assets/images/11.png)
*Slika 11 - Stranica Administrator/Rezervacije, opcija Aktuelne rezervacije. Ako je klijent preuzeo automobil, ima status "realizovana". Prikazano je i kašnjnje vraćanja vozila, u danima.*

![12.png](/docs/assets/images/12.png)
*Slika 12 - Izborom rezervacije sa spiska, dobijaju se svi detalji o klijentu i automobilu. Moguće je promijeniti status rezervacije.*

![13.PNG](/docs/assets/images/13.png)
*Slika 13 - Stranica Administrator/Rezervacije, opcija Istorija rezervisanja. Moguće je filtrirati spisak, po određenim kriterijumima. Moguće je pogledati detalje svake rezervacije i ukloniti rezervaciju.*

