function onSwitchesChange(event, elem) {
  const target = event.target;
  if (target.dataset.varient === 'switch') {
    const priceSwitch = elem.querySelector('input[data-varient="product-price"]');
    priceSwitch.checked = undefined;
  } else if (target.dataset.varient === 'product-price') {
    const affectsPrice = document.querySelector('#affects');
    affectsPrice.checked = true;
  }
}