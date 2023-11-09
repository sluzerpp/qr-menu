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

function onItemDragOver(e, elem) {
  e.preventDefault();
  const draggable = document.querySelector('.dragging');
  const list = elem.parentElement.querySelector('.categories__item-list');
  if (elem.parentElement === draggable) {
    return;
  }
  elem.classList.add('dragover');
  const box = elem.getBoundingClientRect()
  const offset = box.left + box.width / 5;
  if (e.clientX >= offset) {
    e.stopPropagation();
    if (!elem.parentElement.classList.contains('open')) {
      elem.parentElement.classList.add('open');
    }
    if (draggable.contains(list)) return;
    if (list.firstElementChild) {
      if (draggable.contains(list.firstChild)) return;
      list.insertBefore(draggable, list.firstChild);
    } else {
      list.appendChild(draggable);
    }
  }
}

function onItemDragEnd(e, elem) {
  e.preventDefault();
  elem.classList.remove('dragover');
}

function onListDragOver(e, list) {
  e.preventDefault();
  const draggable = document.querySelector('.dragging');
  if (list.parentElement === draggable) {
    return;
  }
  e.stopPropagation();
  const afterElement = getDragAfterElement(list, e.clientY || e.touches[0].clientY);
  if (afterElement == null) {
    list.appendChild(draggable)
  } else {
    if (draggable.contains(afterElement)) return;
    list.insertBefore(draggable, afterElement)
  }
}

function clearDragover(elem) {
  const dragovers = elem.querySelectorAll('.dragover');
  dragovers.forEach((dragover) => dragover.classList.remove('dragover')); 
}

const categoriesContainer = document.querySelector('.categories__content');

categoriesContainer.addEventListener('mousemove', () => {
  clearDragover(categoriesContainer);
})
categoriesContainer.addEventListener('mouseleave', () => {
  clearDragover(categoriesContainer);
})
categoriesContainer.addEventListener('mouseup', () => {
  clearDragover(categoriesContainer);
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

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