function onSocialInputChange(elem, btnSelector) {
  const btn = document.querySelector(btnSelector);
  if (!elem.value) {
    btn.setAttribute('disabled', true);
  } else {
    btn.removeAttribute('disabled');
  }
}