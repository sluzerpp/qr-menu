function onCategoryDropdownClick(e, elem) {
  e.stopPropagation();
  const item = elem.closest('.categories__item:has(.categories__item-content:not(:empty))');
  if (item === elem.parentElement.parentElement.parentElement) {
    item.classList.toggle('open');
  }
}

function onDragStart(e, elem) {
  if (window.innerWidth > 1080 || e.target.classList.contains('drag-btn')) {
    e.stopPropagation();
    elem.classList.add('dragging');
    elem.classList.remove('open');
  }
}

function onDragEnd(e, elem) {
  e.stopPropagation();
  elem.classList.remove('dragging');
  const dragovers = document.querySelectorAll('.dragover');
  dragovers.forEach((dragover) => dragover.classList.remove('dragover'));
}

function onItemDragOver(e, elem) {
  e.preventDefault();
  const draggable = document.querySelector('.dragging');
  const list = elem.parentElement.querySelector('.categories__item-list');
  const draggableStyles = window.getComputedStyle(draggable.parentElement);
  const leftMargin = parseInt(draggableStyles.marginLeft);
  const offsetWithoutMargin = draggable.offsetLeft - leftMargin;
  if (!list || (list.offsetLeft !== draggable.offsetLeft && offsetWithoutMargin !== elem.offsetLeft)) return;
  if (!elem.parentElement.classList.contains('open')) {
    elem.parentElement.classList.add('open');
  }
  if (list.children.length > 0) return;
  elem.classList.add('dragover');
  const box = elem.getBoundingClientRect();
  const offset = box.left + box.width / 5;
  if ((e.clientX || e.touches[0].clientX) >= offset) {
    e.stopPropagation();
    if (draggable.contains(list)) return;
    list.appendChild(draggable);
  }
}

function onListDragOver(e, list) {
  const draggable = document.querySelector('.dragging');
  if (draggable) {
    e.preventDefault();
  }
  if (![...list.childNodes].includes(draggable) && list.offsetLeft !== draggable.offsetLeft) return;
  e.stopPropagation();
  const afterElement = getDragAfterElement(list, e.clientY || e.touches[0].clientY);
  if (afterElement == null) {
    list.appendChild(draggable)
  } else {
    list.insertBefore(draggable, afterElement)
  }
}

function getDragAfterElement(list, y) {
  const draggableElements = [...list.querySelectorAll('.draggable:not(.dragging)')]

  draggableElements.forEach((elem) => elem.classList.remove('open'));

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}