const input = document.getElementById('input');
const check = document.getElementById('check');
const result = document.getElementById('result');
const length = input.value.length;

check.addEventListener('click', () => {
  checkInputValidity();
});

// Check Card Number Length if its 13, 15, 16 or 19
function checkInputValidity() {
  const length = input.value.length;
  switch (true) {
    case length === 0:
      result.innerHTML = `<h1>ENTER A CARD NUMBER</h1>`;
      break;
    case length === 13:
    case length === 15:
    case length === 16:
    case length === 19:
      luhnCheck(input.value);
      break;
    default:
      result.innerHTML = `<h1>INVALID CARD</h1>`;
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

  if (sum % 10 !== 0) {
    result.innerHTML = `<h1>DID NOT PASS CHECK</h1>`;
  } else {
    let newArr = (num + '').split('').map((x) => parseInt(x));
    if (newArr[0] == 4) {
      if (input.value.length == 13 || input.value.length == 16) {
        result.innerHTML = `<h1>VISA</h1>`;
      }
    } else if (newArr[0] == 5 && input.value.length == 16) {
      result.innerHTML = `<h1>MASTER</h1>`;
    } else if (newArr[0] == 3 && input.value.length == 15) {
      if (newArr[1] == 4 || newArr[1] == 7) {
        result.innerHTML = `<h1>AMEX</h1>`;
      }
    } else if (newArr[0] == 6 && input.value.length == 16) {
      result.innerHTML = `<h1>DISCOVER</h1>`;
    } else {
      result.innerHTML = `<h1>THIS IS AN UNKNOWN CARD TYPE</h1>`;
    }
  }
  console.log(input.value.length);
};
