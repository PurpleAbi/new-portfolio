function burgerMenu() {
    const navLinks = document.querySelector(".links");
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
    }
  }
  
  const myAge = (new Date().getFullYear()) - 1995;
  document.getElementById("my-age").innerText = myAge;

