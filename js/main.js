/*$(document).ready(function(){

  $('.hamburger-menu').click(function(event){
    event.stopPropagation();
    if ($('page-layout').hasClass('active')){
      $('page-layout').removeClass('active');
    } else {
      $('page-layout').addClass('active');
    }
  });

  $('page-layout').click(function(){
    $('page-layout').removeClass('active');
  });

});

$(document).ready(function() {
    alert ("Hello");
}); */


const hamburger = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const pageLayout = document.getElementById('page-layout');
const overlay = document.querySelector('.menu-overlay');

// Funkcija za otvaranje/zatvaranje menija
function toggleMenu() {
    mobileNav.classList.toggle('active');
    overlay.style.display = mobileNav.classList.contains('active') ? 'block' : 'none';
    pageLayout.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);

// Zatvaranje klikom na overlay
overlay.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    overlay.style.display = 'none';
    pageLayout.classList.remove('active');
});

// Zatvaranje klikom na link u meniju
document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        overlay.style.display = 'none';
        pageLayout.classList.remove('active');
    });
});
