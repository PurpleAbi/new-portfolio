
function openNav() {
  document.getElementById("myNav").style.height = "90vh";
  const toggle = document.querySelector(".icon");
  if (toggle) toggle.setAttribute("aria-expanded", "true");
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
  const toggle = document.querySelector(".icon");
  if (toggle) toggle.setAttribute("aria-expanded", "false");
}

if (document.title == 'About Abi') {
  const date = new Date();
  let myAge = (date.getFullYear()) - 1995;
  if(date.getMonth() == 3 && date.getDate() < 22 || date.getMonth() < 3){
    myAge -= 1;
  } 
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
const explorer = document.getElementById('explorer');
const reveal = document.getElementById('reveal');
const lists = reveal ? reveal.querySelectorAll('.project-list') : [];
let activeBtn = null;

lists.forEach(list => {
  // Initially hidden
  list.setAttribute('aria-hidden', 'true');
});

function showList(targetId) {
  lists.forEach(list => {
    const isMatch = list.id === targetId;
    list.classList.toggle('visible', isMatch);
    list.setAttribute('aria-hidden', isMatch ? 'false' : 'true');
  });
}

categories.forEach(category => {
  category.addEventListener('click', e => {
    const currentTarget = e.currentTarget;
    const targetId = currentTarget.dataset.target;
    const targetList = document.getElementById(targetId);
    if (!targetList) {
      console.warn('Target list not found for id:', targetId);
      return;
    }

    if (activeBtn === currentTarget) {
      // Same category clicked again: collapse back to the default state.
      reveal.classList.remove('open');
      explorer.dataset.state = 'collapsed';
      currentTarget.classList.remove('active');
      currentTarget.setAttribute('aria-expanded', 'false');
      targetList.setAttribute('aria-hidden', 'true');
      activeBtn = null;
      return;
    }

    categories.forEach(cat => {
      cat.classList.remove('active');
      cat.setAttribute('aria-expanded', 'false');
    });
    currentTarget.classList.add('active');
    currentTarget.setAttribute('aria-expanded', 'true');

    showList(targetId);
    explorer.dataset.state = 'expanded';
    reveal.classList.add('open');
    activeBtn = currentTarget;
  });
});






