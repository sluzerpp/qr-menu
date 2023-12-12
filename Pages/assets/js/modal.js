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

function toggleUserAdd(event, elem = null) {
  event.preventDefault();
  if (elem && event.target !== elem) return;
  const userAdd = document.getElementById('user-add');
  if (document.body.classList.contains('open-user-add')) {
    toggleBodyClass('open-user-add');
    userAdd.classList.add('close');
  } else {
    toggleBodyClass('open-user-add');
    userAdd.classList.remove('close');
  }
}

function onTipBtnClick(elem) {
  const tutorialItemsElem = document.querySelector('.tutorial__items');
  if (!tutorialItemsElem) {
    return;
  }
  const ids = elem.dataset.path.split('.');
  const elems = ids.map((id) => {
    return document.getElementById(id);
  });
  for (let elem of elems) {
    if (elem) {
      elem.classList.add('open');
    }
  }
  const lastElem = elems[elems.length - 1];
  document.body.classList.add('open-tutorial');
  tutorialItemsElem.scrollTo(0, lastElem.offsetTop)
} 

let prevState = []

function toggleBodyClass(className, constraint = null, event = null) {
  if (event) {
    event.preventDefault();
  }
  if (constraint && event && event.target === constraint) {
    if (!document.body.classList.contains(className)) {
      if (document.body.className) {
        prevState.push(document.body.className);
      }
    } else {
      document.body.className = prevState.pop() || '';
      return;
    }
    document.body.className = (className);
  } else {
    if (!document.body.classList.contains(className)) {
      if (document.body.className) {
        prevState.push(document.body.className);
      }
    } else {
      document.body.className = prevState.pop() || '';
      return;
    }
    document.body.className = (className);
  }
  
}