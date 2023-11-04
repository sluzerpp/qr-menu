function onTutorialItemClick(elem) {
  if (elem.parentElement.classList.contains('open')) {
    elem.parentElement.classList.remove('open');
    elem.parentElement.classList.add('close');
  } else {
    elem.parentElement.classList.add('open');
    elem.parentElement.classList.remove('close');
  }
}

function closeTutorial(event) {
  if (event.target.classList.contains('tutorial')) {
    document.body.classList.remove('open-tutorial');
  }
}

function onCloseTutorialBtn() {
  document.body.classList.remove('open-tutorial');
}

function toggleMobileMenu() {
  document.body.classList.toggle('open-mobile');
}

function onTipBtnClick(elem) {
  const tutorialItemsElem = document.querySelector('.tutorial__items');
  const ids = elem.dataset.path.split('.');
  const elems = ids.map((id) => {
    return document.getElementById(id);
  });
  for (let elem of elems) {
    elem.classList.add('open');
  }
  const lastElem = elems[elems.length - 1];
  document.body.classList.add('open-tutorial');
  tutorialItemsElem.scrollTo(0, lastElem.offsetTop)
} 