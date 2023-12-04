function onSelectOptionClick(elem) {
  const target = elem;
  const value = target.dataset.value;
  let content = target.textContent;
  const valueElem = target.parentElement.parentElement.querySelector('.custom-select__value');
  if (!valueElem) return;
  const selectElem = target.parentElement.parentElement;
  if (selectElem.classList.contains('disabled-select')) {
    return;
  }
  if (!selectElem) return;
  if (selectElem.classList.contains('custom-select_number') || selectElem.classList.contains('custom-select_with-img')) {
    content = target.innerHTML;
  }
  selectElem.dataset.currentValue = value;
  valueElem.innerHTML = content;
  selectElem.classList.remove('open');
}

function onSelectOpenBtnClick(elem, event = null) {
  if (event) {
    event.preventDefault();
  }
  const selectElem = elem.parentElement;
  if (selectElem.classList.contains('disabled-select')) {
    return;
  }
  selectElem.classList.toggle('open');
}

function closeAllSelects(target = null) {
  const selects = document.querySelectorAll('.custom-select');
  selects.forEach((select) => {
    if (select !== target && !select.contains(target)) {
      select.classList.remove('open')
    }
  });
}

document.addEventListener('click', (event) => {
  closeAllSelects(event.target);
});

function onNumberSelectOptionClick(elem) {
  onSelectOptionClick(elem);
  const selectElem = elem.parentElement.parentElement;
  const inputElem = selectElem.nextElementSibling;

  inputElem.dataset.format = selectElem.dataset.currentValue;
  inputElem.value = selectElem.dataset.currentValue;
}

function onPhoneNumberInput(elem) {
  const format = elem.dataset.format;
  const inputValue = elem.value.replace(/\D/g, '').slice(format.length - 1);

  elem.value = format+inputValue;
}

function onHierarchySelectClick(event, callback = null) {
  event.preventDefault();
  const text = event.target.parentElement.textContent;
  const value = event.target.value;
  const select = event.currentTarget.parentElement;
  if (select.classList.contains('disabled-select')) {
    event.target.checked = false;
    return;
  }
  select.dataset.currentValue = value;
  const valueElem = select.querySelector('.select-hierarchy__value');
  valueElem.textContent = text;
  select.classList.remove('open');
  if (callback) {
    callback(value, select);
  }
}

function openSelectDropdown(elem) {
  elem.closest('.select-hierarchy__option_with-list').classList.toggle('open');
}

function onHierarchyMultiplySelectClick(event, options = { message: '', checkbox: null }) {
  event.preventDefault();
  const target = options.checkbox || event.target;
  const value = target.value;
  const select = event.currentTarget.parentElement;
  if (select.classList.contains('disabled-select')) {
    event.target.checked = false;
    return;
  }
  const option = target.closest('.select-hierarchy__option');
  const valueElem = select.querySelector('.select-hierarchy__value');
  let valuesArray = [];
  if (select.dataset.currentValue) {
    valuesArray = select.dataset.currentValue.split(', ');
  }
  if (target.checked) {
    if (valuesArray.includes(value)) return;
    valuesArray.push(value);  
  } else {
    if (!valuesArray.includes(value)) return;
    valuesArray = valuesArray.filter((val) => val !== value);
  }
  if (valuesArray.length > 0) {
    select.dataset.currentValue = valuesArray.join(', ');
    valueElem.textContent = `Выбрано - ${valuesArray.length} ${options.message || ''}`;
  } else {
    select.dataset.currentValue = '';
    valueElem.textContent = 'Не выбрано';
  }
  if (option.classList.contains('select-hierarchy__option_with-list')) {
    const options = option.querySelectorAll('.select-hierarchy__option');
    options.forEach((option) => {
      const checkbox = option.querySelector('input');
      checkbox.checked = target.checked;
      event.target = checkbox;
      onHierarchyMultiplySelectClick(event, { ...options, checkbox });
    });
  }
}

function updateHierarchyOptionSublings(option) {
  
}

function resetHierarchySelect(select) {
  const valueElem = select.querySelector('.select-hierarchy__value');
  valueElem.textContent = 'Не выбрано';
  select.dataCurrentValue = '';
  const options = select.querySelectorAll('input');
  options.forEach((option) => option.checked = false);
}