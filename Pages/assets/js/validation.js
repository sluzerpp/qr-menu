function onFormDataChange(form) {
  const saveBtns = document.querySelectorAll('.save-btn');

  const isValid = form.checkValidity();
  if (isValid) {
    saveBtns.forEach((btn) => btn.removeAttribute('disabled'));
  } else {
    saveBtns.forEach((btn) => btn.setAttribute('disabled', true))
  }
}