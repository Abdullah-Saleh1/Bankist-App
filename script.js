'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

const account1 = {
  owner: 'Abdullah Saleh',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-04-01T10:17:24.185Z',
    '2022-05-08T14:11:59.604Z',
    '2022-05-27T17:01:17.194Z',
    '2023-08-05T23:36:17.929Z',
    '2023-08-06T14:53:49.142Z'
  ],
  currency: 'USD',
  locale: 'en-US', 
};

const account2 = {
  owner: 'Mohammed Tawfiq',
  movements: [700, -254, 42, 2000, -1400, 200, 3000, -235],
  interestRate: 1.1,
  pin: 2222,

  movementsDates: [
    '2022-10-01T13:15:33.035Z',
    '2022-02-30T09:48:16.867Z',
    '2022-09-25T06:04:23.907Z',
    '2022-11-25T14:18:46.235Z',
    '2023-01-05T16:33:06.386Z',
    '2023-01-10T14:43:26.374Z',
    '2023-01-25T18:49:59.371Z',
    '2023-02-26T12:01:20.894Z',
  ],
  currency: 'EGP',
  locale: 'ar-EG', 
};

const account3 = {
  owner: 'Ali Ahmed',
  movements: [500, 2300, -250, -790, -3210, -1000, 8500, -110],
  interestRate: 1.3,
  pin: 3333,

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'GBP',
  locale: 'en-UK',
};

const account4 = {
  owner: 'Osama Ahmed',
  movements: [25000, -3424, -150, -791, 3219, -13000, 500, -30, 155],
  interestRate: 1.5,
  pin: 4444,

  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
    '2023-07-27T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const account5 = {
  owner: 'Abdulaziz Saleh',
  movements: [6000, 1600, -2345, -290, -3210, -870, 168, -30],
  interestRate: 1.5,
  pin: 5555,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'es-ES',
};

const accounts = [account1, account2, account3, account4, account5];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const labelError = document.querySelector('.error .error__message'); 

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const errorMessage = document.querySelector('.error'); 

// Functions
const calcDaysPassed = (date1, date2) => Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24))); 
const formatCur = (n, acc) => new Intl.NumberFormat(acc.locale, {style: 'currency', currency: acc.currency}).format(n);

const displayMovements = function(acc, sort = false) {
  // Clear The Container
  containerMovements.innerHTML = ''; 

  // Shallow Copy 
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements; 

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const date = new Date(acc.movementsDates[i]); 
    const days = calcDaysPassed(new Date(), date); 
    let dateStr; 
    if (days === 0) dateStr = 'Today'; 
    else if (days === 1) dateStr = 'Yesterday'; 
    else if (days <= 7) dateStr = `${days} Days Ago`; 

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${dateStr || displayDate(date, acc.locale)}</div>
      <div class="movements__value">${formatCur(mov, acc)}</div>
    </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html); 
  }); 
}

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((a, c) => a + c); 
  labelBalance.textContent = `${formatCur(acc.balance, acc)}`
}

// You Can Make It With One Parameter Which Is The Account Object
const calcDisplaySummary = function(acc) {
  labelSumIn.textContent = formatCur(acc.movements.reduce((acc, cur) => cur > 0 ? acc += cur : acc), acc); 
  labelSumOut.textContent = formatCur(Math.abs(acc.movements.reduce((acc, cur) => cur < 0 ? acc += cur : acc, 0)), acc);
  labelSumInterest.textContent = formatCur(acc.movements.filter(e => e > 0).map(e => e * acc.interestRate/100).reduce((a, int) => int > 1 ? a += int : a), acc); 
}

const generateUsernames = function(accs) {
  accs.forEach(acc => acc.username = acc.owner.split(' ').map(e => e[0]).join('').toLowerCase()); 
}
generateUsernames(accounts);

const updateUI = function (curAcc) {
  calcDisplayBalance(curAcc);
  displayMovements(curAcc); 
  calcDisplaySummary(curAcc)
  const now = new Date(); 
  const options = {
    hour: 'numeric', 
    minute: 'numeric', 
    day: '2-digit', 
    month: 'long', // numeric, long, 2-digit
    year: 'numeric', 
    weekday: 'short', // long, short, narrow(one Letter)
  }
  // const locale = navigator.language; 

  labelDate.textContent = new Intl.DateTimeFormat(curAcc.locale , options).format(now); // ISO Language Code Table
  containerApp.style.opacity = 100; 
}

const logOut = function() {
  containerApp.style.opacity = '0'; 
  labelWelcome.textContent = `Log in to get started`; 
  currentAccount = undefined; 
}

function displayDate(date, locale) {
  return new Intl.DateTimeFormat(locale).format(date); // ISO Language Code Table
  // return `${`${date.getDate()}`.padStart(2, 0)}/${`${date.getMonth() + 1}`.padStart(2, 0)}/${date.getFullYear()}`; 
}

const showError = function(message) {
  labelError.textContent = message; 
  errorMessage.classList.add('error--show'); 
  setTimeout(() => {
    errorMessage.classList.remove('error--show'); 
  }, 2000)
}

const startTimer = function() {
  // Call The Timer Every Second
  const tick = function() {
    // In Each Call Print The Remaining To The UI
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0); // 120 / 2 => 2
    const sec = `${time % 60}`.padStart(2, 0); // 120 % 60
    labelTimer.textContent = `${min}:${sec}`; 

    // When 0 Seconds Stop Timer Then Log Out The User
    if (time === 0) {
      logOut(); 
      clearInterval(timer);
    }

    // Decrease Time By 1
    time--
    
  }

  // Set Time To 5 Min
  let time = 600; // 10 Min

  tick(); // To Start Counting Right Away
  const timer = setInterval(tick, 1000)
  // This Function Will Start After 1 Second(NOT Immediatly) So We Use Tick Fn

  return timer; 

} 


// Event Handler 
let currentAccount, timer, error; 

btnLogin.addEventListener('click', (e) => {
  // Prevent Form From Submitting
  e.preventDefault(); 

  // Reassign The Current Account
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value && acc.pin === +inputLoginPin.value)

  if (currentAccount) {

    // Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = ''; 
    // Make The Input Field Lose Its Focus(The Cursor Blinking)
    inputLoginPin.blur(); 
  
    // Display UI And Greating Message
    containerApp.style.opacity = '1'; 
    
    // Start The Timer
    if (timer) clearInterval(timer)
    timer = startTimer();

    // Display Balance, Movements And Summaray
    labelWelcome.textContent = `Good Afternoon, ${currentAccount.owner.split(' ')[0]}!`; 
    updateUI(currentAccount); 
  } else {
    showError('Incorrrect User Or Pin'); 
  }
})

btnTransfer.addEventListener('click', e => {
  e.preventDefault(); 

  const amount = +inputTransferAmount.value; 
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value); 
  if (amount > 0 && receiverAcc && amount <= currentAccount.balance && receiverAcc.username !== currentAccount?.username) {
    // Doing The Transfer
    currentAccount.movements.push(-amount); 
    receiverAcc.movements.push(amount); 

    // Create A Transfer Date
    currentAccount.movementsDates.push(new Date().toISOString()); 
    receiverAcc.movementsDates.push(new Date().toISOString()); 

    // Update The UI
    updateUI(currentAccount);
    
    // Clear Input Fields 
    inputTransferAmount.value = inputTransferTo.value = '';

    // Restart Timer
    clearInterval(timer); 
    timer = startTimer(); 
  } else if (!receiverAcc) {
    showError('User Not Found'); 
  } else {
    showError('Invalid Number'); 
  }
})

btnLoan.addEventListener('click', e => {
  e.preventDefault(); 

  const amount = Math.floor(inputLoanAmount.value); 
  
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) { 
    setTimeout(() => {
      // Add The Loan Then Update The UI
      currentAccount.movements.push(amount); 
      currentAccount.movementsDates.push(new Date().toISOString()); 
      updateUI(currentAccount); 
            
      // Restart The Timer 
      if (timer) clearInterval(timer); 
      timer = startTimer(); 
    }, 2000); 

  } else {
    showError('Invalid Number'); 
  }
  inputLoanAmount.value = ''; 
})

btnClose.addEventListener('click', e => {
  e.preventDefault();
  
  if (inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin) {
    inputCloseUsername.value = inputClosePin.value = ''; 

    // Remove The Account From Data
    accounts.splice(accounts.findIndex(acc => acc.username === inputCloseUsername.value && acc.pin === +inputClosePin.value), 1); 
    
    // Hide The UI And change The Message
    logOut(); 

    // Restart Timer
    clearInterval(timer); 
    timer = startTimer(); 
  } else {
    showError('User Not Found');
  }
})

let isSorted = false; 
btnSort.addEventListener('click', e => {
  e.preventDefault(); 

  displayMovements(currentAccount, !isSorted); 
  isSorted = !isSorted; 
}); 





