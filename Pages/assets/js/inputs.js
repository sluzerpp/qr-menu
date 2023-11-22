function onTimeInputHandler(elem) {
  const inputValue = elem.value.replace(/\D/g, '').slice(0, 4);

  if (inputValue.length > 2) {
    elem.value = `${inputValue.slice(0, 2)}:${inputValue.slice(2)}`;
  } else {
    elem.value = inputValue;
  }
}

function datePickerBtnClick(elem) {
  const dateElem = elem.nextElementSibling;
  if ('showPicker' in dateElem) {
    dateElem.showPicker();
  }
}

function onDateInputChange(elem) {
  const inputDate = new Date(elem.value);
  const textInput = elem.nextElementSibling;
  const dateFormat = textInput.dataset.format;

  if (isNaN(inputDate)) {
    elem.value = '';
    textInput.value = '';
    return;
  }

  const month = inputDate.getMonth() + 1;
  let day = inputDate.getDate().toString();
  day = day.length > 1 ? day : `0${day}`;
  const year = inputDate.getFullYear();

  if (dateFormat === "mm.dd.yyyy") {
    textInput.value = `${month}.${day}.${year}`;
  } else if (dateFormat === "yyyy.mm.dd") {
    textInput.value = `${year}.${month}.${day}`;
  } else {
    textInput.value = `${year}.${month}.${year}`;
  }
}

function onDateInputHandler(elem) {
  const dateFormat = elem.dataset.format;
  const inputValue = elem.value.replace(/\D/g, '').slice(0, 8);

  if (dateFormat === "yyyy.mm.dd") {
    if (inputValue.length > 4 && inputValue.length <= 6) {
      elem.value = `${inputValue.slice(0, 4)}.${inputValue.slice(4, 6)}`;
    } else if (inputValue.length > 6) {
      elem.value = `${inputValue.slice(0, 4)}.${inputValue.slice(4, 6)}.${inputValue.slice(6)}`;
    } else {
      elem.value = inputValue;
    }
  } else {
    if (inputValue.length > 2 && inputValue.length <= 4) {
      elem.value = `${inputValue.slice(0, 2)}.${inputValue.slice(2, 4)}`;
    } else if (inputValue.length > 4) {
      elem.value = `${inputValue.slice(0, 2)}.${inputValue.slice(2, 4)}.${inputValue.slice(4)}`;
    } else {
      elem.value = inputValue;
    }
  }
}

const textAreas = document.querySelectorAll('.textarea');

const formatLength = (length, maxLength) => `${length} / ${maxLength}`;

textAreas.forEach((textarea) => {
  const input = textarea.querySelector('textarea');
  const lengthElem = textarea.querySelector('.textarea__length');

  const initHeight = input.getBoundingClientRect().height;

  const length = input.value.length;
  const maxLength = input.maxLength;

  lengthElem.textContent = formatLength(length, maxLength);

  input.addEventListener('input', () => {
    const currentLength = input.value.length;
    lengthElem.textContent = formatLength(currentLength, maxLength);

    if (currentLength === 0) {
      textarea.style.height = `${initHeight}px`;
      return;
    }

    if (input.scrollHeight > textarea.clientHeight) {
      textarea.style.height = `${input.scrollHeight}px`;
    }
  });
});

function onNumberInput(elem, event = null) {
  let inputValue = elem.value;
  inputValue = inputValue.replace(/[^\d.,]/g, '');

  inputValue = inputValue.replace(/([.,])[.,]+/g, '$1');

  inputValue = inputValue.replace(/([.,]\d{2})[\d.,]+$/g, '$1');

  elem.value = inputValue;
}

function toggleDropdown(elem, parentSelector) {
  elem.closest(parentSelector).classList.toggle('open');
}

function onSwitchListChange(elem) {
  if (elem.checked) {
    const inputs = elem.closest('.switch_list').querySelectorAll('.switch__list input[type="checkbox"]');
    inputs.forEach((input) => {
      input.checked = true;
      input.onchange();
    });
  }
}

const selected = [];

const selectedContainer = document.querySelector('.product-selected-options');

function onProductOptionChange(option) {
  if (option.checked) {
    const exist = selected.find((item) => item.option === option);
    if (!exist) {
      const group = option.dataset.groupName || '';
      const name = option.closest('.switch').textContent.trim();
      const item = createSelectedItem(name, group);
      selected.push({ option: option, item: item });
      selectedContainer.appendChild(item);
    } else {
      selectedContainer.appendChild(exist.item);
    }
  } else {
    const exist = selected.find((item) => item.option === option);
    if (exist) {
      exist.item.remove();
    }
  }
}

function createSelectedItem(title, group) {
  const item = document.createElement('div');
  item.className = 'product-selected-options__item draggable';
  item.draggable = true;
  item.ondragstart = (event) => {
    onDragStart(event, item);
  }
  item.ondragend = () => {
    onDragEnd(item);
  }
  item.ontouchstart = (event) => {
    onDragStart(event, item);
  }
  item.ontouchend = () => {
    onDragEnd(item);
  }
  const btn = document.createElement('button');
  btn.className = 'drag-btn';
  item.append(btn, `${title} (${group})`);
  return item;
}

document.addEventListener('click', (e) => {
  const target = e.target;
  const dropdowns = document.querySelectorAll('.controls-dropdown.open');
  dropdowns.forEach((dropdown) => {
    if (!(target.classList.contains('more-btn') && dropdown.contains(target))) {
      dropdown.classList.remove('open')
    }
  });
  const closestDropdown = e.target.closest('.controls-dropdown');
  if (!target.classList.contains('more-btn') && closestDropdown && closestDropdown.contains(target)) {
    closestDropdown.classList.add('open');
  }
});

function onSelectAllCheckboxChange(checkbox) {
  if (checkbox.checked) {
    const checkboxes = document.querySelectorAll('.products__list-content input[type="checkbox"]');
    checkboxes.forEach((check) => check.checked = true);
  }
}

function onPricingCheckboxChange(checkbox) {
  if (!checkbox.checked) {
    const checkboxes = document.querySelectorAll('.products__list input[type="checkbox"]');
    console.log(checkboxes);
    checkboxes.forEach((check) => check.checked = false);
  }
}

function onPasswordIconClick(icon) {
  const wrapper = icon.parentElement;
  const input = wrapper.firstElementChild;
  if (wrapper.classList.contains('view')) {
    input.setAttribute('type', 'password');
    wrapper.classList.remove('view');
  } else {
    input.setAttribute('type', 'text');
    wrapper.classList.add('view');
  }
}