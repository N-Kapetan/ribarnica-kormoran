document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".filters button"); /*JavaScript metoda koja služi za dohvaćanje svih elemenata u dokumentu koji odgovaraju nekom CSS selektoru. */
  const recepti = document.querySelectorAll(".card-grid article");

  buttons.forEach(button => {
    button.addEventListener("click", () => {   /*pokreni funkciju kada se dogodi neki događaj - klik na gumb */
      const kategorija = button.getAttribute("data-kategorija");

      // Ukloni 'active' klasu sa svih gumba
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      //filtracija
      recepti.forEach(recept => {
        if (kategorija === "sve") {
          recept.style.display = "block";
        } else if (recept.classList.contains(kategorija)) {
          recept.style.display = "block";
        } else {
          recept.style.display = "none";
        }
      });
    });
  });
});