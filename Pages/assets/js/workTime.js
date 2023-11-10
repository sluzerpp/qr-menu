const rows = document.querySelectorAll('.time-table__row');

rows.forEach((row) => {
  const checkbox = row.querySelector('input[type="checkbox"]');

  const inputs = row.querySelectorAll('.time-input');

  if (checkbox.checked) {
    inputs.forEach((input) => input.disabled = null);
  } else {
    inputs.forEach((input) => input.disabled = true);
  }

  checkbox.addEventListener('change', () => {
    const inputs = row.querySelectorAll('.time-input');
    if (checkbox.checked) {
      inputs.forEach((input) => input.disabled = null);
    } else {
      inputs.forEach((input) => input.disabled = true);
    }
  });
});