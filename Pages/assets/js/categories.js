function onCategoryDropdownClick(elem) {
  const item = elem.closest('.categories__item:has(.categories__item-content:not(:empty))');
  if (item === elem.parentElement.parentElement.parentElement) {
    item.classList.toggle('open');
  }
}

function onDragStart(e, elem) {
  e.stopPropagation();
  elem.classList.add('dragging');
  elem.classList.remove('open');
}

function onDragEnd(e, elem) {
  e.stopPropagation();
  elem.classList.remove('dragging');
}

function onListDragOver(e, list) {
  e.preventDefault();
  const draggable = document.querySelector('.dragging');
  if (![...list.childNodes].includes(draggable)) return;
  e.stopPropagation();
  const afterElement = getDragAfterElement(draggable, e.clientY || e.touches[0].clientY);
  if (afterElement == null) {
    list.appendChild(draggable)
  } else {
    list.insertBefore(draggable, afterElement)
  }
}

function getDragAfterElement(draggable, y) {
  const draggableElements = [...draggable.parentElement.querySelectorAll('.draggable:not(.dragging)')]

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