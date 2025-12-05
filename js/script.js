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

 /* document.addEventListener("DOMContentLoaded", () => {
  const pretraga = document.getElementById("pretraga");
  const proizvodi = document.getElementById("proizvodi");

  //definicija funkcije za rukovanje podacima
  const rukujPodacima = function(podaci) {
    var ispis = "", 
      nazivProizvoda,
      vrstaProizvoda,
      cijenaProizvoda;

      for(let i = 0; i < podaci.length; i++) {
        nazivProizvoda = podaci[i].nazivProizvoda;
        vrstaProizvoda = podaci[i].vrstaProizvoda;
        cijenaProizvoda = podaci[i].cijenaProizvoda;

        ispis += `<p><strong>Naziv proizvoda: </strong>${nazivProizvoda}
        <br><strong>Vrsta proizvoda:</strong> ${vrstaProizvoda}
        <br><strong>cijenaProizvoda:</strong> ${cijenaProizvoda} €/kg<p><hr>`;
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

}); */

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
    fetch("proizvodi.json")
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
