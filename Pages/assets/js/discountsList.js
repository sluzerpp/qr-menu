function initDiscountList(list) {
  list.style.opacity = 0;
  const listWidth = list.getBoundingClientRect().width;
  const items = list.querySelectorAll('li');
  const arrow = list.querySelector('label');
  const arrowWidth = arrow.getBoundingClientRect().width;
  let lineWidth = arrowWidth;
  let wasFalse = false;
  const firstLineItems = [...items].filter((item) => {
    if (wasFalse) return false;
    const itemWidth = item.getBoundingClientRect().width + 3;
    if (lineWidth + itemWidth < listWidth) {
      lineWidth += itemWidth;
      return true;
    }
    wasFalse = true;
    return false;
  });

  items.forEach((item) => item.remove());
  arrow.remove();
  list.append(...firstLineItems, arrow);

  list.style.opacity = 1;

  let isOpen = false;
  
  const createClickHandler = () => {
    isOpen = !isOpen
    if (isOpen) {
      items.forEach((item) => item.remove());
      arrow.remove();
      arrow.classList.add('open');
      list.append(...items, arrow);
    } else {
      items.forEach((item) => item.remove());
      arrow.remove();
      arrow.classList.remove('open');
      list.append(...firstLineItems, arrow);
    }
  }

  arrow.onclick = createClickHandler;
}

// Функция для обработки добавленных элементов списка
function handleNewItems() {
  initDiscountList();
}

let isInit = false;

function initOnChange() {
  if (!isInit) {
    const discountLists = document.querySelectorAll('.product-varient__discounts .discounts-list');
    discountLists.forEach((list) => {
      initDiscountList(list);
    })
    isInit = true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const discountLists = document.querySelectorAll('.product__discounts .discounts-list');
  discountLists.forEach((list) => {
    initDiscountList(list);
  })
})