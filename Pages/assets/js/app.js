// class CustomSelect {
//   constructor(element, options, defaultValue) {
//     this.select = element;
//     this.optionsContainer = this.select.querySelector('.select__options');
//     this.optionsContainer.innerHTML = '';
//     this.selectBtn = this.select.querySelector('.select__btn');
//     const defaultOption = options.find((option) => option.value === defaultValue);
//     this.value = defaultOption.value;
//     this.selectBtn.innerHTML = defaultOption.text + `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="13" viewBox="0 0 22 13" fill="none">
//       <path d="M21 11.5L11 1.5L1 11.5" stroke="black" stroke-width="2"/>
//     </svg>`;
//     this.options = options;
//     this.optionsElems = options.map((option) => this.createOption(option, () => {
//       this.setValue(option.value);
//       this.toggleSelect();
//     }));
//     this.optionsContainer.append(...this.optionsElems);
//     this.selectBtn.addEventListener('click', this.toggleSelect.bind(this));
//   }

//   toggleSelect() {
//     this.select.classList.toggle('select_open');
//   }

//   setValue(value) {
//     const option = this.options.find((option) => option.value === value);
//     this.value = option.value;
//     this.selectBtn.innerHTML = option.text + `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="13" viewBox="0 0 22 13" fill="none">
//       <path d="M21 11.5L11 1.5L1 11.5" stroke="black" stroke-width="2"/>
//     </svg>`;
//   }

//   createOption(option, callback) {
//     const btn = document.createElement('button');
//     btn.className = 'select__option';
//     btn.textContent = option.text;
//     btn.addEventListener('click', callback);
//     return btn;
//   }
// }

function onSelectOptionClick(elem) {
  const target = elem;
  const value = target.dataset.value;
  const content = target.textContent;
  if (!value) return;
  const valueElem = target.parentElement.parentElement.querySelector('.custom-select__value');
  if (!valueElem) return;
  const selectElem = target.parentElement.parentElement;
  if (!selectElem) return;
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

function onTutorialItemClick(elem) {
  if (elem.parentElement.classList.contains('open')) {
    elem.parentElement.classList.remove('open');
    elem.parentElement.classList.add('close');
  } else {
    elem.parentElement.classList.add('open');
    elem.parentElement.classList.remove('close');
  }
}