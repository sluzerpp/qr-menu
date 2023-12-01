let select, wrapper;

function onIsParentSwitchChange(elem) {
  if (!select || !wrapper) {
    select = document.querySelector('#parent-select');
    wrapper = document.querySelector('#parent-select-wrapper');
  }
  if (elem.checked) {
    select.classList.add('disabled-select');
    wrapper.classList.add('disabled');
  } else {
    select.classList.remove('disabled-select');
    wrapper.classList.remove('disabled');
  }
}