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

  const length = input.value.length;
  const maxLength = input.maxLength;

  lengthElem.textContent = formatLength(length, maxLength);

  input.addEventListener('input', () => {
    const currentLength = input.value.length;
    lengthElem.textContent = formatLength(currentLength, maxLength);

    if (input.scrollHeight > textarea.clientHeight) {
      textarea.style.height = `${input.scrollHeight}px`;
    }
  });
});