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

// const CreditCard = () => {
//   const [creditCardNumber, setCreditCardNumber] = useState('');
//   const [creditCardHolderName, setCreditCardHolderName] = useState('CS50 Credit Card');

//   const visaImageLink =
//     'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png';

//   const masterCardImageLink =
//     'https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg';
//   const amexCardImageLink = 'https://cdn.icon-icons.com/icons2/1178/PNG/512/amex_82052.png';

//   const inValidImageLink =
//     'https://previews.123rf.com/images/chrisdorney/chrisdorney1411/chrisdorney141100155/34073570-invalid-red-rubber-stamp-over-a-white-background-.jpg';

//   const type = cardType(creditCardNumber);

//   const cardImage = (creditCardNumber) => {
//     if (type === 'Invalid') {
//       return inValidImageLink;
//     } else if (type === 'AMEX') {
//       return amexCardImageLink;
//     } else if (type === 'Master Card') {
//       return masterCardImageLink;
//     } else if (type === 'VISA') {
//       return visaImageLink;
//     }
//   };
//   const addSpaceAfterFour = (number) => {
//     number = number.toString();
//     return number.match(/.{1,4}/g).join(' ');
//   };

//   // Get the Credit card number

//   function checksum(creditCardNumber) {
//     //   console.log(creditCardNumber);

//     // Iterate over the creditCardNumber
//     creditCardNumber = reverseString(creditCardNumber.toString());
//     let secondToLastSum = 0;
//     for (var i = 0; i < creditCardNumber.length; i++) {
//       if ((i + 1) % 2 === 0) {
//         if ((parseInt(creditCardNumber[i]) * 2).toString().length === 2) {
//           // console.log(parseInt(creditCardNumber[i]) * 2)
//           secondToLastSum += sumOfString(parseInt(creditCardNumber[i]) * 2);
//         } else {
//           secondToLastSum += parseInt(creditCardNumber[i] * 2);
//         }
//       } else {
//         secondToLastSum += parseInt(creditCardNumber[i]);
//       }
//     }
//     //   console.log(secondToLastSum)
//     return secondToLastSum % 2 === 0;
//   }

//   // console.log(checksum(4003600000000014));
//   // console.log(secondToLastSum)

//   function sumOfString(num) {
//     num = num.toString();
//     let sum = 0;
//     for (var i = 0; i < num.length; i++) {
//       sum += parseInt(num[i]);
//     }
//     return sum;
//   }

//   // console.log(sumOfString(1))
//   // Reverse string
//   function reverseString(str) {
//     if (str === '') return '';
//     else return reverseString(str.substr(1)) + str.charAt(0);
//   }

//   function cardType(creditCardNumber) {
//     if (typeof parseInt(creditCardNumber) !== 'number') {
//       return 'Invalid';
//     }

//     creditCardNumber = creditCardNumber.toString();
//     //   console.log("Credit Card Length: " + creditCardNumber.length);

//     if (checksum(creditCardNumber) === true) {
//       // console.log("Check sum pass");

//       // Check For AMEX
//       var firstTwoChar = creditCardNumber.toString().substring(0, 2);
//       // console.log("First Two Char: " + firstTwoChar);
//       const masterCardTwoValid =
//         firstTwoChar === '51' ||
//         firstTwoChar === '52' ||
//         firstTwoChar === '53' ||
//         firstTwoChar === '54' ||
//         firstTwoChar === '55';
//       const amexTwoValid = firstTwoChar === '34' || firstTwoChar === '37';
//       const visaTwoValid = creditCardNumber[0] === '4';
//       const visaCardLenValid = creditCardNumber.length === 13 || creditCardNumber.length === 16;
//       // console.log("Master Card Two Valid: " + masterCardTwoValid);
//       // console.log("Amex Card Two Valid: " + amexTwoValid);
//       // console.log("Visa Card Two Valid: " + visaTwoValid);
//       // console.log("Visa Card Len Valid: " + visaCardLenValid);

//       if (creditCardNumber.length === 15 && amexTwoValid) {
//         //   console.log("AMEX");
//         return 'AMEX';
//       } else if (creditCardNumber.length === 16 && masterCardTwoValid) {
//         console.log('Master Card');
//         return 'Master Card';
//       } else if (visaCardLenValid && visaTwoValid) {
//         //   console.log("VISA");
//         return 'VISA';
//       } else {
//         //   console.log("Invalid");
//         return 'Invalid';
//       }
//     } else {
//       // console.log("Invalid");
//       return 'Invalid';
//     }
//   }

//   const handleCreditCardHolderNameChange = (event) => {
//     setCreditCardHolderName(event.target.value);
//   };

//   const handleCreditCardNumberChange = (event) => {
//     setCreditCardNumber(event.target.value);
//   };
//   return (
//     <div>
//       <Card variant='outlined' style={cardStyle}>
//         <div className='firstRow' style={firstRowStyle}>
//           <div className='chipImage' style={chipImageStyle}>
//             <img
//               style={{ width: 50 }}
//               alt='chip'
//               src={
//                 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png'
//               }
//             />
//           </div>
//           <div className='cardName' style={cardNameStyle}>
//             <img
//               src={cardImage(creditCardNumber)}
//               alt='visaImageLink'
//               style={{ width: 100, marginRight: 10 }}
//             />
//           </div>
//         </div>
//         <div className='secondRow' style={secondRowStyle}>
//           <div style={{ fontSize: 30 }}>
//             {creditCardNumber === '' ? '#### #### #### ####' : addSpaceAfterFour(creditCardNumber)}
//           </div>
//         </div>
//         <div className='thirdRow' style={thirdRowStyle}>
//           <div style={{ fontSize: 30 }}>
//             {creditCardHolderName === '' ? 'CS50 Credit Card' : creditCardHolderName}
//           </div>
//         </div>
//       </Card>

//       <Card style={cardFormStyle}>
//         <div style={{ margin: 'auto', marginTop: 20 }}>
//           <form>
//             <TextField
//               id='filled-basic'
//               label='Credit Card Number'
//               variant='filled'
//               value={creditCardNumber}
//               onChange={handleCreditCardNumberChange}
//             />
//           </form>
//         </div>
//         <div style={{ margin: 'auto', marginTop: 20, marginBottom: 30 }}>
//           <form>
//             <TextField
//               id='filled-basic'
//               label='Card Holder'
//               variant='outlined'
//               color='primary'
//               value={creditCardHolderName}
//               onChange={handleCreditCardHolderNameChange}
//             />
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// };
