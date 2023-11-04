function onTimeInputHandler(elem) {
  const inputValue = elem.value.replace(/\D/g, '').slice(0, 4);

  if (inputValue.length > 2) {
    elem.value = `${inputValue.slice(0, 2)}:${inputValue.slice(2)}`;
  } else {
    elem.value = inputValue;
  }
}