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
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

// function onGridListDragOver(e, list) {
//   e.preventDefault();
//   const draggable = list.querySelector('.dragging');
//   const target = e.target.closest('.draggable:not(.dragging)');
//   if (target && draggable) {
//     const targetIndex = Array.from(list.children).indexOf(target);
//     const draggedIndex = Array.from(list.children).indexOf(draggable);
    
//     if (targetIndex < draggedIndex) {
//       list.insertBefore(draggable, target);
//     } else {
//       list.insertBefore(draggable, target.nextSibling);
//     }
//   }
// }

function onGridListDragOver(e, list) {
  e.preventDefault();
  const draggable = list.querySelector('.dragging');
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;
  
  if (draggable) {
    const pointElem = document.elementFromPoint(x, y);
    
    if (!pointElem) return;

    const target = pointElem.closest('.draggable:not(.dragging)');

    if (target) {
      const targetIndex = Array.from(list.children).indexOf(target);
      const draggedIndex = Array.from(list.children).indexOf(draggable);
      
      if (targetIndex < draggedIndex) {
        list.insertBefore(draggable, target);
      } else {
        list.insertBefore(draggable, target.nextSibling);
      }
    }
  }
}

function onImageDragStart(e, elem) {
  const y = e.clientY || e.touches[0].clientY;
  const x = e.clientX || e.touches[0].clientX;
  const dragBtn = elem.querySelector('.drag-btn');
  const box = dragBtn.getBoundingClientRect();
  if (window.innerWidth < 1080 || (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom)) {
    e.stopPropagation();
    elem.classList.add('dragging');
  }
}