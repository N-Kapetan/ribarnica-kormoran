// povratak na vrh
  
  const naVrh = document.getElementById("na-vrh"); // dohvaća id na vrh i sprema ga u varijablu

  // Glatko skrolanje na vrh
  naVrh.addEventListener("click", (e) => {
    e.preventDefault(); // sprečava da stranica skoči
    window.scrollTo({  //glatko skrolanje na vrh
      top: 0,
      behavior: "smooth" //glatka animacija
    });
  });
