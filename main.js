function burgerMenu() {
  const navLinks = document.querySelector(".links");
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
  }
}

let i = 0;
let txt = "You can check out my Virtual Resumee in the meantime";
let speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

document.addEventListener("DOMContentLoaded", typeWriter);

const myAge = (new Date().getFullYear()) - 1995;
document.getElementById("my-age").innerText = myAge;


