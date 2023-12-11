const regex = /^(0[0-9]?|1[0-9]?|2[0-3]?)((:)([0-5][0-9]?)?)?$/;

function validateTimeInput(value) {
  return regex.test(value);
}

const prevValues = new Map();

function onTimeInputHandler(elem) {
  const currentValue = elem.value;
  const prevValue = prevValues.get(elem) || '';

  if (!prevValue.includes(':') && prevValue !== currentValue && !currentValue.includes(':')) {
    if (currentValue.length === 2) {
      elem.value += ':';
    } else if(currentValue.length === 3) {
      elem.value = currentValue.slice(0, 2) + ':' + currentValue.slice(2);
    }
  }
  
  const isValidInput = validateTimeInput(elem.value);

  if (!isValidInput && currentValue) {
    elem.value = prevValue;
  } else {
    prevValues.set(elem, currentValue || '');
  }  
}

const timePeriodInputs = new Map();

function onTimePeriodInputsHandler(elem, event, classStart, classEnd) {
  const currentInput = event.target;

  const inputs = timePeriodInputs.get(elem);
  let inputStart, inputEnd;
  if (inputs) {
    inputStart = inputs.inputStart;
    inputEnd = inputs.inputEnd;
  }

  if (currentInput.classList.contains(classStart)) {
    if (!inputEnd) {
      inputEnd = elem.querySelector(`.${classEnd}`);
      timePeriodInputs.set(elem, { inputStart, inputEnd });
    }
    const startValue = currentInput.value;
    const endValue = inputEnd.value;
    if (validateTimeInput(startValue) && validateTimeInput(endValue)) {
      if (startValue > endValue) {
        currentInput.setCustomValidity('Начальное время не может быть больше конечного!');
        currentInput.reportValidity();
      } else {
        currentInput.setCustomValidity('');
      }
    }
  } else if (currentInput.classList.contains(classEnd)) {
    if (!inputStart) {
      inputStart = elem.querySelector(`.${classStart}`);
      timePeriodInputs.set(elem, { inputStart, inputEnd });
    }
    const startValue = inputStart.value;
    const endValue = currentInput.value;
    console.log(startValue, endValue);
    if (validateTimeInput(startValue) && validateTimeInput(endValue)) {
      if (startValue > endValue) {
        currentInput.setCustomValidity('Конечное время не может быть меньше начального!');
        currentInput.reportValidity();
      } else {
        currentInput.setCustomValidity('');
      }
    }
  }
}



function datePickerBtnClick(elem) {
  const dateElem = elem.nextElementSibling;
  if ('showPicker' in dateElem) {
    dateElem.showPicker();
  }
}

function onDateInputChange(elem, empty = '') {
  const inputDate = new Date(elem.value);
  const textInput = elem.nextElementSibling;
  const dateFormat = textInput.dataset.format;

  if (isNaN(inputDate)) {
    elem.value = empty;
    textInput.value = empty;
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
    textInput.value = `${day}.${month}.${year}`;
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

function onNumberInput(elem, fraction = true) {
  let inputValue = elem.value;
  
  if (fraction) {
    inputValue = inputValue.replace(/[^\d,]/g, '');

    inputValue = inputValue.replace(/([,])[,]+/g, '$1');

    inputValue = inputValue.replace(/([,]\d{2})[\d,]+$/g, '$1');
  } else {
    inputValue = inputValue.replace(/[^\d]/g, '');
  }

  elem.value = inputValue;
}

let openedDropdown = null;
let openedDropdownSelector = '';

function toggleSimpleDropdown(elem, parentSelector) {
  const parent = elem.closest(parentSelector);
  parent.classList.toggle('open');
}

function toggleDropdown(elem, parentSelector) {
  const parent = elem.closest(parentSelector);
  parent.classList.toggle('open');
  if (parent.classList.contains('open')) {
    openedDropdown = parent;
    openedDropdownSelector = parentSelector;
  } else {
    if (openedDropdown === parent) {
      openedDropdown = null;
      openedDropdownSelector = null;
    }
  }
  const rect = elem.getBoundingClientRect();
  const dropdown = parent.querySelector(parentSelector + '__content');
  dropdown.style.right = (window.innerWidth - rect.right) + 'px'; 
  dropdown.style.top = rect.top + rect.height + 8 + 'px';
  if (dropdown.getBoundingClientRect().bottom > window.innerHeight) {
    dropdown.style.top = rect.top - dropdown.clientHeight - 8 + 'px';
  }
}

function updateOpenedDropdownPosition() {
  if (openedDropdown && openedDropdownSelector) {
    const dropdown = openedDropdown.querySelector(openedDropdownSelector + '__content');
    const rect = openedDropdown.getBoundingClientRect();
    dropdown.style.right = (window.innerWidth - rect.right) + 'px'; 
    dropdown.style.top = rect.top + rect.height + 8 + 'px';
    if (dropdown.getBoundingClientRect().bottom > window.innerHeight) {
      dropdown.style.top = rect.top - dropdown.clientHeight - 8 + 'px';
    }
  }
}

document.addEventListener('scroll', updateOpenedDropdownPosition, { capture: true });


window.addEventListener('resize', updateOpenedDropdownPosition);

function onSwitchListChange(elem) {
  if (elem.checked) {
    const inputs = elem.closest('.switch_list').querySelectorAll('.switch__list input[type="checkbox"]');
    inputs.forEach((input) => {
      input.checked = true;
      input.onchange();
    });
  } else {
    const inputs = elem.closest('.switch_list').querySelectorAll('.switch__list input[type="checkbox"]');
    inputs.forEach((input) => {
      input.checked = false;
      input.onchange();
    });
  }
}

const selected = [];

const selectedContainer = document.querySelector('.product-selected-options');

function onProductOptionChange(option) {
  const list = option.closest('.switch_list')
  const groupSwitch = list.querySelector('.switch__content input[type="checkbox"]'); 
  const inputs = list.querySelectorAll('.switch__list input[type="checkbox"]');
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
    groupSwitch.checked = [...inputs].every((input) => input.checked);
  } else {
    const exist = selected.find((item) => item.option === option);
    if (exist) {
      exist.item.remove();
    }
    groupSwitch.checked = [...inputs].every((input) => input.checked);
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
  const dropdowns = [...document.querySelectorAll('.controls-dropdown.open')];
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
  const checkboxes = document.querySelectorAll('.products__list-content input[type="checkbox"]');
  if (checkbox.checked) {
    checkboxes.forEach((check) => check.checked = true);
  } else {
    checkboxes.forEach((check) => check.checked = false);
  }

  onPricingFormChange();
}

function onProductCheckboxChange(container, callback = null) {
  const selectAllCheckbox = document.querySelector('.products__list-header input[type="checkbox"]');
  const checkboxes = [...container.querySelectorAll('input[type="checkbox"]')];
  selectAllCheckbox.checked = checkboxes.every((item) => item.checked);

  if (callback) {
    callback();
  }
}

function onPricingCheckboxChange(checkbox) {
  const items = document.querySelectorAll('.products__item');
  if (!checkbox.checked) {
    items.forEach((item) => item.setAttribute('draggable', true))
    const checkboxes = document.querySelectorAll('.products__list input[type="checkbox"]');
    checkboxes.forEach((check) => check.checked = false);
    const valueInput = document.querySelector('#pricing-value');
    valueInput.value = '';
    const radios = document.querySelectorAll('#pricing-form input[type="radio"]');
    [...radios].forEach((radio) => radio.checked = false);
    const selectNotChoose = document.querySelector('#pricing-form input[value=""]');
    selectNotChoose.checked = true;
    const select = document.querySelector('#pricing-form .custom-select');
    const selectValueElem = select.querySelector('.custom-select__value');
    select.dataset.dataCurrentValue = '';
    selectValueElem.innerHTML = 'Не выбрано'; 
  } else {
    items.forEach((item) => item.removeAttribute('draggable'))
  }
}

function onPricingFormChange() {
  const btn = document.querySelector('#pricing-submit');
  const form = document.querySelector('#pricing-form');
  const pricingFormat = form['pricing-format'].value;
  const pricingValue = form['pricing-value'].value;
  const checkboxes = document.querySelectorAll('.products__list-content input[type="checkbox"]');
  if (!pricingFormat || !pricingValue || [...checkboxes].every((item) => !item.checked)) {
    btn.setAttribute('disabled', true);
  } else {
    btn.removeAttribute('disabled');
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

function selectDatePickerBtnClick(elem) {
  const dateElem = elem.firstElementChild;
  if ('showPicker' in dateElem) {
    dateElem.showPicker();
    dateElem.focus();
  }
}

function onControllerNumberInputMinusClick(event) {
  const input = event.currentTarget.nextElementSibling;
  let currentValue = parseInt(input.value);

  if (isNaN(currentValue)) {
    currentValue = 0;
  }
  currentValue -= 1;

  currentValue = currentValue < 0 ? 0 : currentValue;

  input.value = currentValue;

  onNumberInput(input, false)
}

function onControllerNumberInputPlusClick(event) {
  const input = event.currentTarget.previousElementSibling;
  let currentValue = parseInt(input.value);
  
  if (isNaN(currentValue)) {
    currentValue = 0;
  }
  
  currentValue += 1;

  input.value = currentValue;

  onNumberInput(input, false)
}

function onWrapperImgSwitchChange(elem) {
  const wrapper = elem.closest('.wrapper-img');
  if (!wrapper) return;
  const img = wrapper.querySelector('.wrapper-img__img');
  const input = wrapper.querySelector('.text-input');
  if (elem.checked) {
    img.removeAttribute('disabled');
    img.classList.remove('disabled');
    input.classList.remove('disabled');
    input.removeAttribute('disabled');
  } else {
    img.setAttribute('disabled', true);
    img.classList.add('disabled');
    input.classList.add('disabled');
    input.setAttribute('disabled', true);
  }
}

const linkInput = document.querySelector('#video-link');
const uploadBtn = document.querySelector('#additional-image-upload-btn');

function onVideoLinkSwitchChange(event) {
  const target = event.target;
  if (!linkInput || !uploadBtn) return;
  if (target.checked) {
    linkInput.classList.remove('disabled');
    linkInput.removeAttribute('disabled');
    uploadBtn.classList.add('disabled');
    uploadBtn.setAttribute('disabled', true);
  } else {
    linkInput.classList.add('disabled');
    linkInput.setAttribute('disabled', true);
    uploadBtn.classList.remove('disabled');
    uploadBtn.removeAttribute('disabled');
  }
}

const numerations = ['letter', 'number'];

function onNumerationRadioChange(event) {
  const target = event.target;
  if (numerations.includes(target.value)) {
    const textInputs = document.querySelectorAll('#numeration .text-input');
    textInputs.forEach((input) => {
      if (input.id.includes(target.value)) {
        input.classList.remove('hidden');
        input.setAttribute('required', true);
      } else {
        input.classList.add('hidden');
        input.removeAttribute('required');
      }
    });
  }
}

function onObjectTypeChange(value) {
  console.log(value);
  const numeration = document.querySelector('#numeration');
  const copyCount = document.querySelector('#copy-count-wrapper');
  if (!value) {
    numeration.classList.add('disabled');
    copyCount.classList.add('disabled');
  } else {
    numeration.classList.remove('disabled');
    copyCount.classList.remove('disabled');
  }
}

function onCopyBtnClick(event, id) {
  event.preventDefault();
  const input = document.getElementById(id);
  if (!input) return;
  navigator.clipboard.writeText(input.value);
}