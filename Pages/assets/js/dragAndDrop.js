function onDragStart(elem) {
  elem.classList.add('dragging');
}

function onDragEnd(elem) {
  elem.classList.remove('dragging');
}

function onListDragOver(e, list) {
  e.preventDefault()
  const afterElement = getDragAfterElement(list, e.clientY)
  const draggable = document.querySelector('.dragging')
  if (afterElement == null) {
    list.appendChild(draggable)
  } else {
    list.insertBefore(draggable, afterElement)
  }
}

function onListTouchMove(e, list) {
  e.preventDefault()
  const afterElement = getDragAfterElement(list, e.touches[0].clientY)
  const draggable = document.querySelector('.dragging')
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