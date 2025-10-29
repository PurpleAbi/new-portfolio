// function burgerMenu() {
//   const navLinks = document.querySelector(".links");
//   if (navLinks.style.display === "flex") {
//     navLinks.style.display = "none";
//   } else {
//     navLinks.style.display = "flex";
//   }
// }

/* Open */
function openNav() {
  document.getElementById("myNav").style.height = "90vh";
}

/* Close */
function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}

if (document.title == 'About Abi') {
  const myAge = (new Date().getFullYear()) - 1995;
  document.getElementById("my-age").innerText = myAge;
}

const spans = document.querySelectorAll('.title span');

spans.forEach((span, idx) => {
  span.addEventListener('click', (e) => {
    e.target.classList.add('active');
  });
  span.addEventListener('animationend', (e) => {
    e.target.classList.remove('active');
  });

  // Initial animation
  setTimeout(() => {
    span.classList.add('active');
  }, 750 * (idx + 1))
});

const categories = document.querySelectorAll('.categories');
const right = document.querySelector('.right');
if (!right) console.warn('Element .right not found in DOM');
const lists = right ? right.querySelectorAll('.project-list') : [];
let activeList = null;

// Inicializar atributos ARIA y accesibilidad básica
categories.forEach(cat => {
  // Mark as button for assistive tech and allow keyboard focus
  if (!cat.hasAttribute('role')) cat.setAttribute('role', 'button');
  if (!cat.hasAttribute('tabindex')) cat.setAttribute('tabindex', '0');
  // Initial aria state
  cat.setAttribute('aria-expanded', 'false');
});

lists.forEach(list => {
  // Initially hidden
  list.setAttribute('aria-hidden', 'true');
});

// Allow keyboard activation (Enter / Space) on categories
categories.forEach(cat => {
  cat.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cat.click();
    }
  });
});

categories.forEach(category => {
  category.addEventListener('click', e => {
    const targetId = e.currentTarget.dataset.target;
    const targetList = document.getElementById(targetId);
    if (!targetList) {
      console.warn('Target list not found for id:', targetId);
      return;
    }

    if(activeList === targetList) {
        // Close the currently active list. When finished, hide the right column.
      slideUp(targetList, () => {
        if (right) {
          right.classList.add('hidden');
          right.classList.remove('visible');
        }
        // Update ARIA states
        targetList.setAttribute('aria-hidden', 'true');
        e.currentTarget.setAttribute('aria-expanded', 'false');
      });
      activeList = null;
      e.currentTarget.classList.remove('active');
      return;
    }

    if (activeList) slideUp(activeList);

    // Marca la categoría activa y actualiza aria-expanded
    categories.forEach(cat=>{
      cat.classList.remove('active');
      cat.setAttribute('aria-expanded', 'false');
    });
    e.currentTarget.classList.add('active');
    e.currentTarget.setAttribute('aria-expanded', 'true');

    // Quita visibilidad de todas las listas *antes* de iniciar la animación
    lists.forEach(list => {
      list.classList.remove('visible');
    });

    // Muestra la sección derecha
    if (right) {
      right.classList.remove('hidden');
      right.classList.add('visible');
    }

  // Inicia la animación de apertura y actualiza aria-hidden
  targetList.setAttribute('aria-hidden', 'false');
  slideDown(targetList);
  activeList = targetList;
  });
});

function slideDown(element){
  element.classList.add('animating');
  element.style.height = element.scrollHeight + "px";
  element.style.opacity ='1';

// Esperar a que termine la animación
    element.addEventListener('transitionend', function handler() {
    element.classList.remove('animating');
    element.style.height = 'auto';
    element.removeEventListener('transitionend', handler);
  });

  element.classList.add('visible');
}

function slideUp(element, onComplete) {
  element.classList.add('animating');
  element.style.height = element.scrollHeight + 'px';

  // Forzar reflow (importante para que la animación funcione bien)
  void element.offsetHeight;

  element.style.height = '0';
  element.style.opacity = '0';

  element.addEventListener('transitionend', function handler() {
    element.classList.remove('animating', 'visible');
    element.removeEventListener('transitionend', handler);
    if (typeof onComplete === 'function') onComplete();
  });
}






