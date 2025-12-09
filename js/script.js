document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".filters button");
  const recepti = document.querySelectorAll(".card-grid article"); /*JavaScript metoda koja služi za dohvaćanje svih elemenata u dokumentu koji odgovaraju nekom CSS selektoru.*/
  const poruka = document.getElementById("nema-recepata");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const kategorija = button.getAttribute("data-kategorija");

      // Ukloni 'active' sa svih gumba
      buttons.forEach(btn => btn.classList.remove("active"));  /*pokreni funkciju kada se dogodi neki događaj - klik na gumb */
      button.classList.add("active");

      let vidljivih = 0; // brojat ćemo koliko je recepata prikazano

      //filtracija
      recepti.forEach(recept => {
        if (kategorija === "sve" || recept.classList.contains(kategorija)) {
          recept.style.display = "block";
          vidljivih++;
        } else {
          recept.style.display = "none";
        }
      });

      // Prikaži/skrij poruku ako nema rezultata
      if (vidljivih === 0) {
        poruka.style.display = "block";
      } else {
        poruka.style.display = "none";
      }
    });
  });
});




/*------------------------------------------- pretraga po tagu---------------------------------*/

/*
  //definicija funkcije za rukovanje podacima
  const rukujPodacima = function(podaci) {
    var ispis = "", 
      naziv,
      vrsta,
      cijena;

      for(let i = 0; i < podaci.length; i++) {
        naziv = podaci[i].naziv;
        vrsta = podaci[i].vrsta;
        cijena = podaci[i].cijena;
        console.log(`${naziv}, ${vrsta}, ${cijena}`);

        ispis += `<p><strong>Naziv proizvoda: </strong>${naziv}
        <br><strong>Vrsta proizvoda:</strong> ${vrsta}
        <br><strong>cijenaProizvoda:</strong> ${cijena} €/kg<p><hr>`;
      }
      proizvodi.innerHTML = ispis;
  };

  const rukujGreskom = function(error) {
    proizvodi.innerHTML = `<p>Greška kod obrade zahtjeva: ${error}</p>`
    
  };

  //funkcija za dohvaćanje podataka
  pretraga.addEventListener("change", function(){
    const vrijednost = pretraga.value; 
    

   fetch("proizvodi.json")

      .then((odgovor) => odgovor.json())
      .then(podaci => rukujPodacima(podaci))
      .catch(error => rukujGreskom(error));

  });

});  */


document.addEventListener("DOMContentLoaded", () => {
  const pretraga = document.getElementById("pretraga");
  const proizvodi = document.getElementById("proizvodi");

  const rukujPodacima = function(podaci, filterTip) {
    let ispis = "";

    if (filterTip === "0") {
      // ništa se ne prikazuje
      proizvodi.innerHTML = "";
      return;
    }

    let filtrirani = [...podaci];

    if (filterTip === "1") { // po nazivu
      filtrirani.sort((a, b) => a.naziv.localeCompare(b.naziv));
    } else if (filterTip === "2") { // po cijeni
      filtrirani.sort((a, b) => a.cijena - b.cijena);
    } else if (filterTip === "3") { // po vrsti
      filtrirani.sort((a, b) => a.vrsta.localeCompare(b.vrsta));
    }

    filtrirani.forEach(item => {
      ispis += `<p>
        <strong>Naziv proizvoda:</strong> ${item.naziv}<br>
        <strong>Vrsta proizvoda:</strong> ${item.vrsta}<br>
        <strong>Cijena:</strong> ${item.cijena} €/kg
      </p><hr>`;
    });

    proizvodi.innerHTML = ispis;
  };

  const rukujGreskom = function(error) {
    proizvodi.innerHTML = `<p>Greška kod obrade zahtjeva: ${error}</p>`;
  };

  const ucitajProizvode = function(filterTip) {
    fetch("https://kormoran-3650c-default-rtdb.europe-west1.firebasedatabase.app/.json")
      .then(response => response.json())
      .then(podaci => rukujPodacima(podaci, filterTip))
      .catch(error => rukujGreskom(error));
  };

  // ne učitava ništa na početku
  proizvodi.innerHTML = "";

  // kada korisnik odabere opciju
  pretraga.addEventListener("change", function() {
    ucitajProizvode(pretraga.value);
  });
}); 

/*--------------------------------- pretraga po nazivu cjenik----------------------------*/

document.addEventListener("DOMContentLoaded", () => {

    const trazilica = document.getElementById("trazilica");
    const proizvodiPoNazivu = document.getElementById("proizvodi-po-nazivu");

    // mapa naziva → id sidra na stranici
    const idMapa = {
        "Amur": "amur",
        "Šaran": "saran",
        "Som": "som",
        "Smuđ": "smud",
        "Štuka": "stuka",
        "Tolstolobik": "tolstolobik",
        "Orada": "orada",
        "Brancin": "brancin",
        "Hobotnica": "hobotnica",
        "Lignja": "lignja",
        "Tuna": "tuna",
        "Srdela": "srdela",
        "Šaranove potkove": "saranovePotkove",
        "Odresci od šarana": "odresciOdSarana",
        "Filet od smuđa": "filetOdSmuda",
        "Odresci od tolstolobika": "odresciOdTolstolobika",
        "Odresci od amura": "odresciOdAmura",
        "Filet od grgeča": "filetOdGrgeca"
    };

    let sviProizvodi = [];

    // 1) Učitaj JSON samo jednom
    fetch("proizvodi.json")
        .then(res => res.json())
        .then(data => {
            sviProizvodi = data;
            console.log("Učitano:", sviProizvodi);
        });

    // 2) Reakcija na tipkanje
    trazilica.addEventListener("keyup", () => {

        const vrijednost = trazilica.value.trim().toLowerCase();

        if (!vrijednost) {
            proizvodiPoNazivu.innerHTML = "";
            return;
        }

        // 3) Filtriraj proizvode po nazivu
        const filtrirano = sviProizvodi.filter(p =>
            p.naziv.toLowerCase().includes(vrijednost)
        );

        // 4) Prikaz tablice
        if (filtrirano.length > 0) {

            let podaci = `
            <table class="rezultati-tablica">
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Vrsta</th>
                        <th>Cijena</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
            `;

            filtrirano.forEach(p => {
                const anchor = idMapa[p.naziv] ? `#${idMapa[p.naziv]}` : "#";

                podaci += `
                    <tr>
                        <td>${p.naziv}</td>
                        <td>${p.vrsta}</td>
                        <td>${p.cijena} €/kg</td>
                        <td><a href="${anchor}" class="sidro-link">Idi na sekciju</a></td>
                    </tr>
                `;
            });

            podaci += `
                </tbody>
            </table>
            `;

            proizvodiPoNazivu.innerHTML = podaci;

        } else {
            proizvodiPoNazivu.innerHTML =
                `<h3>Nisu pronađeni podaci niti o jednom artiklu</h3>`;
        }

    });

});
