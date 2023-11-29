function onSwitchesChange(event, elem) {
  const target = event.target;
  if (target.dataset.varient === 'switch') {
    const priceSwitch = elem.querySelector('input[data-varient="product-price"]');
    priceSwitch.checked = undefined;
    resetHierarchySelect(target.closest('.varients__item').querySelector('.select-hierarchy'));
  } else if (target.dataset.varient === 'product-price') {
    const affectsPrice = document.querySelector('#affects');
    affectsPrice.checked = true;
  }
}