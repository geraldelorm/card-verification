const input = document.getElementById('input');
const check = document.getElementById('check');
const provider = document.getElementById('provider');
const cardNumber = document.getElementById('card_number');
const result = document.getElementById('result');
const length = input.value.replace(/\s+/g, '').length;

check.addEventListener('click', () => {
  checkInputValidity();
});

// Check Card Number Length if its 13, 15, 16 or 19
function checkInputValidity() {
  const length = input.value.replace(/\s+/g, '').length;
  switch (true) {
    case length === 0:
      result.innerHTML = `<h1>Enter A Card Number</h1>`;
      break;
    case length === 13:
    case length === 15:
    case length === 16:
    case length === 19:
      luhnCheck(input.value.replace(/\s+/g, ''));
      break;
    default:
      result.innerHTML = `<h1>Invalid Length</h1>`;
      provider.style.backgroundImage = 'url(./assets/svg/unknown-folder.svg)';
      cardNumber.innerText = newNum;
  }
}

// Luhn Algorithm
const luhnCheck = (num) => {
  let arr = (num + '')
    .split('')
    .reverse()
    .map((x) => parseInt(x));
  let lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
  sum += lastDigit;
  //  To space out numbers for card display
  var displayNum = (num + '').split('');
  const newArr = [];
  for (let i = 0; i < displayNum.length; i++) {
    if (i == 3 || i == 7 || i == 11 || i == 15) {
      newArr.push(displayNum[i] + ' ');
    } else {
      newArr.push(displayNum[i]);
    }
  }
  var newNum = newArr.join('');
  if (sum % 10 !== 0) {
    result.innerHTML = `<h1>Your Card Is Invalid</h1>`;
    provider.style.backgroundImage = 'url(./assets/svg/unknown-folder.svg)';
    cardNumber.innerText = newNum;
  } else {
    let newArr = (num + '').split('').map((x) => parseInt(x));
    if (newArr[0] == 4) {
      if (
        input.value.replace(/\s+/g, '').length == 13 ||
        input.value.replace(/\s+/g, '').length == 16
      ) {
        result.innerHTML = `<h1>Your Card Is A VISA Card</h1>`;
        provider.style.backgroundImage = 'url(./assets/svg/visa.svg)';
        cardNumber.innerText = newNum;
      }
    } else if (newArr[0] == 5 && input.value.replace(/\s+/g, '').length == 16) {
      result.innerHTML = `<h1>Your Card Is A Mastercard</h1>`;
      provider.style.backgroundImage = 'url(./assets/svg/mastercard.svg)';
      cardNumber.innerText = newNum;
      // } else if (newArr[0] == 2 && input.value.replace(/\s+/g, '').length == 16) {
      //   result.innerHTML = `<h1>Your Card Is A Mastercard</h1>`;
      //   provider.style.backgroundImage = 'url(./assets/svg/mastercard.svg)';
      //   cardNumber.innerText = newNum;
    } else if (newArr[0] == 3 && input.value.replace(/\s+/g, '').length == 15) {
      if (newArr[1] == 4 || newArr[1] == 7) {
        result.innerHTML = `<h1>Your Card Is An American Express Card</h1>`;
        provider.style.backgroundImage = 'url(./assets/svg/american-express.svg)';
        cardNumber.innerText = newNum;
      }
    } else if (newArr[0] == 6 && input.value.replace(/\s+/g, '').length == 16) {
      result.innerHTML = `<h1>Your Card Is A Discover Card</h1>`;
      provider.style.backgroundImage = 'url(./assets/svg/discover.svg)';
      cardNumber.innerText = newNum;
    } else {
      result.innerHTML = `<h1>This Card Provider Is Unknown</h1>`;
      provider.style.backgroundImage = 'url(./assets/svg/unknown-folder.svg)';
      cardNumber.innerText = newNum;
    }
  }
};
