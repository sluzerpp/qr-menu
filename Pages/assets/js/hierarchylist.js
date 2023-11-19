function onHierarchyDropdownClick(e, elem) {
  e.stopPropagation();
  const item = elem.closest('.hierarchy-list__item:has(.hierarchy-list__item-content:not(:empty))');
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
}

function onListDragOver(e, list) {
  const draggable = document.querySelector('.dragging');
  if (!draggable) return;
  if (draggable) {
    e.preventDefault();
  }
  e.stopPropagation();
  if (![...list.childNodes].includes(draggable)) return;
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

