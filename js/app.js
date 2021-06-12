const form = document.getElementById('input_area');
const input = document.getElementById('input');
const cardNumber = document.getElementById('card_number');

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

input.addEventListener('keyup', updateValue);

input.addEventListener('change', updateValueAndSpaceOut);

function updateValue(e) {
  cardNumber.textContent = e.target.value;
}
function updateValueAndSpaceOut(e) {
  e.target.value = spaceOut(e.target.value);
  cardNumber.textContent = e.target.value;

  cleanInput();
}
const spaceOut = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i == 3 || i == 7 || i == 11 || i == 15) {
      newArr.push(arr[i] + ' ');
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr.join('').toString();
};

const cleanInput = function () {
  const cleanedInput = input.value.replace(/\s+/g, '');
  let length = input.value.replace(/\s+/g, '').length;

  switch (length) {
    case 0:
      result.innerHTML = `<h1>Enter A Card Number</h1>`;
      provider.style.backgroundImage = 'url(./assets/svg/unknown-folder.svg)';
      break;
    case 13:
    case 15:
    case 16:
    case 19:
      if (luhnCheck(cleanedInput)) {
        checkProvider();
      } else {
        result.innerHTML = `<h1>Invalid Card Number</h1>`;
        provider.style.backgroundImage = 'url(./assets/svg/unknown-folder.svg)';
      }
      break;
    default:
      result.innerHTML = `<h1>Invalid Length</h1>`;
      provider.style.backgroundImage = 'url(./assets/svg/unknown-folder.svg)';
  }
};

const luhnCheck = function (value) {
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) return false;

  // The Luhn Algorithm.
  let nCheck = 0,
    bEven = false;
  value = value.replace(/\D/g, '');

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 == 0;
};

const checkProvider = function () {
  const cleanedInput = input.value.replace(/\s+/g, '');
  let length = input.value.replace(/\s+/g, '').length;
  let inputArray = cleanedInput.split('');

  if (inputArray[0] == 4) {
    if (length == 13 || length == 16) {
      result.innerHTML = `<h1>Your Card Is A VISA Card</h1>`;
      provider.style.backgroundImage = 'url(./assets/svg/visa.svg)';
    }
  } else if (inputArray[0] == 5 && length == 16) {
    result.innerHTML = `<h1>Your Card Is A Mastercard</h1>`;
    provider.style.backgroundImage = 'url(./assets/svg/mastercard.svg)';
  } else if (inputArray[0] == 3 && length == 15) {
    if (inputArray[1] == 4 || inputArray[1] == 7) {
      result.innerHTML = `<h1>Your Card Is An Amex Card</h1>`;
      provider.style.backgroundImage = 'url(./assets/svg/american-express.svg)';
    }
  } else if (inputArray[0] == 6 && length == 16) {
    result.innerHTML = `<h1>Your Card Is A Discover card</h1>`;
    provider.style.backgroundImage = 'url(./assets/svg/discover.svg)';
  } else {
    result.innerHTML = `<h1>Unknown Card Provider</h1>`;
    provider.style.backgroundImage = 'url(./assets/svg/unknown-folder.svg)';
  }
};
