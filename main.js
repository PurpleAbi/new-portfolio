function burgerMenu() {
    const navLinks = document.querySelector(".links");
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
    }
  }