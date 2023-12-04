const listItemsMap = new WeakMap();

function initDiscountList(list) {
  list.style.opacity = 0;
  const listWidth = list.getBoundingClientRect().width;
  let items = [];
  if (listItemsMap.has(list)) {
    items = listItemsMap.get(list);
    items.forEach((item) => item.remove());
  } else {
    items = list.querySelectorAll('li');
    listItemsMap.set(list, items);
  }
  const arrow = list.querySelector('label');
  if (listItemsMap.has(list)) {
    arrow.remove();
    list.append(...items, arrow);
  }
  const arrowWidth = parseInt(window.getComputedStyle(arrow).width);
  let lineWidth = arrowWidth;
  let wasFalse = false;
  const firstLineItems = [...items].filter((item) => {
    if (wasFalse) return false;
    const itemWidth = parseInt(window.getComputedStyle(item).width) + 3;
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

  arrow.onclick = null;
  
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

function initOnChange() {
  const discountLists = document.querySelectorAll('.product-varient__discounts .discounts-list');
  discountLists.forEach((list) => {
    initDiscountList(list);
  })
  isInit = true;
}

document.addEventListener('DOMContentLoaded', () => {
  const discountLists = document.querySelectorAll('.product__discounts .discounts-list');
  discountLists.forEach((list) => {
    initDiscountList(list);
  })
})

let timeoutId = null;

window.addEventListener('resize', () => {
  console.log('here');
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    const discountLists = document.querySelectorAll('.product__discounts .discounts-list');
    discountLists.forEach((list) => {
      initDiscountList(list);
    })
    initOnChange();
  }, 500);
});