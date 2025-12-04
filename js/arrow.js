// povratak na vrh
  // Prikaz strelice nakon skrola
  const naVrh = document.getElementById("na-vrh");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      naVrh.classList.add("show");
    } else {
      naVrh.classList.remove("show");
    }
  });

  // Glatko skrolanje na vrh
  naVrh.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
