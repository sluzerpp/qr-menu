function onSwitchesChange(event, elem) {
  const target = event.target;
  if (target.dataset.varient === 'switch') {
    const priceSwitch = elem.querySelector('[data-varient="price"]');
    const priceCheckbox = elem.querySelector('input[data-varient="product-price"]');
    priceCheckbox.checked = undefined;
    priceCheckbox.setAttribute('disabled', true)
    priceSwitch.classList.add('disabled');
    resetHierarchySelect(target.closest('.varients__item').querySelector('.select-hierarchy'));
  } else if (target.dataset.varient === 'product-price') {
    const affectsPrice = document.querySelector('#affects');
    affectsPrice.checked = true;
    const varient = target.closest('.varients__item');
    const priceInput = varient.querySelector('.varients__price input');
    priceInput.setAttribute('readonly', true)
  }
}

function onAffectsSwitchChange(elem) {
  if (!elem.checked) {
    const priceSwitches = document.querySelectorAll('input[data-varient="product-price"]');
    const priceInputs = document.querySelectorAll('.varients__price input');
    priceSwitches.forEach((item) => item.checked = false);
    priceInputs.forEach((input) => input.removeAttribute('readonly'));
  }
} 

function onGroupAddBtnClick() {
  const nameInput = document.querySelector('#add-group-name');
  if (!nameInput.value) {
    nameInput.classList.add('text-input_error');
  } else {
    nameInput.classList.remove('text-input_error');
  }
}

function onGroupAddNameInput(elem) {
  const saveBtn = document.querySelector('#save-add-group');
  if (!elem.value) {
    saveBtn.setAttribute('disabled', true);
  } else {
    saveBtn.removeAttribute('disabled');
  }
}

function onVarientSelectChange(value, select) {
  const item = select.closest('.varients__item');
  if (!item) return;
  const priceSwitch = item.querySelector('[data-varient="price"]');
  const priceCheckbox = item.querySelector('[data-varient="product-price"]');
  if (!priceSwitch || !priceCheckbox) return;
  if (value) {
    priceSwitch.classList.remove('disabled');
    priceCheckbox.removeAttribute('disabled');
  } else {
    priceSwitch.classList.add('disabled');
    priceCheckbox.setAttribute('disabled', true);
  }
}