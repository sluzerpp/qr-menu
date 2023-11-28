function onSelectOptionClick(elem) {
  const target = elem;
  const value = target.dataset.value;
  let content = target.textContent;
  if (!value) return;
  const valueElem = target.parentElement.parentElement.querySelector('.custom-select__value');
  if (!valueElem) return;
  const selectElem = target.parentElement.parentElement;
  if (!selectElem) return;
  if (selectElem.classList.contains('custom-select_number') || selectElem.classList.contains('custom-select_with-img')) {
    content = target.innerHTML;
  }
  selectElem.dataset.currentValue = value;
  valueElem.innerHTML = content;
  selectElem.classList.remove('open');
}

function onSelectOpenBtnClick(elem) {
  const selectELem = elem.parentElement;
  selectELem.classList.toggle('open');
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

function onHierarchySelectClick(event) {
  event.preventDefault();
  const text = event.target.parentElement.textContent;
  const value = event.target.value;
  const select = event.currentTarget.parentElement;
  select.dataset.currentValue = value;
  const valueElem = select.querySelector('.select-hierarchy__value');
  valueElem.textContent = text;
  select.classList.remove('open');
}

function openSelectDropdown(elem) {
  elem.closest('.select-hierarchy__option_with-list').classList.toggle('open');
}

function onHierarchyMultiplySelectClick(event, checkbox) {
  event.preventDefault();
  const target = checkbox || event.target
  const value = target.value;
  const select = event.currentTarget.parentElement;
  const option = target.closest('.select-hierarchy__option');
  const valueElem = select.querySelector('.select-hierarchy__value');
  if (!option.classList.contains('select-hierarchy__option_with-list')) {
    let valuesArray = [];
    if (select.dataset.currentValue) {
      valuesArray = select.dataset.currentValue.split(', ');
    }
    if (target.checked) {
      if (valuesArray.includes(value)) return;
      valuesArray.push(value);
    } else {
      valuesArray = valuesArray.filter((val) => val !== value);
    }
    if (valuesArray.length > 0) {
      select.dataset.currentValue = valuesArray.join(', ');
      valueElem.textContent = `Выбрано - ${valuesArray.length}`;
    } else {
      select.dataset.currentValue = '';
      valueElem.textContent = 'Не выбрано';
    }
  } else {
    const options = option.querySelectorAll('.select-hierarchy__option');
    options.forEach((option) => {
      const checkbox = option.querySelector('input');
      checkbox.checked = target.checked;
      event.target = checkbox;
      onHierarchyMultiplySelectClick(event, checkbox);
    });
  }
  
  
}

function updateHierarchyOptionSublings(option) {
  
}