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