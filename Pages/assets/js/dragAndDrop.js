function onDragStart(e, elem) {
  if (window.innerWidth > 1080 || e.target.classList.contains('drag-btn')) {
    e.stopPropagation();
    elem.classList.add('dragging');
  }
}

function onDragEnd(elem) {
  elem.classList.remove('dragging');
}

function onListDragOver(e, list) {
  const draggable = document.querySelector('.dragging')
  if (draggable) {
    e.preventDefault()
  }
  const afterElement = getDragAfterElement(list, e.clientY || e.touches[0].clientY)
  if (![...list.childNodes].includes(draggable)) return;
  if (afterElement == null) {
    list.appendChild(draggable)
  } else {
    list.insertBefore(draggable, afterElement)
  }
}


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