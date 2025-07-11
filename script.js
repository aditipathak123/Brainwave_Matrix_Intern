const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '' || amount.value == 0) {
    alert('Please enter a valid description and non-zero amount');
    return;
  }

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value,
    date: new Date().toLocaleDateString()
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();

  text.value = '';
  amount.value = '';
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    <div>
      <strong>${transaction.text}</strong>
      <div class="date">${transaction.date}</div>
    </div>
    <span>${sign}₹${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(txn => txn.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts.filter(a => a > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
  const expense = (amounts.filter(a => a < 0).reduce((acc, val) => acc + val, 0) * -1).toFixed(2);

  // FIX: Using template literals (backticks `) for correct string interpolation
   balance.innerText = `₹${total}`;
   money_plus.innerText = `+₹${income}`;
   money_minus.innerText = `-₹${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(txn => txn.id !== id);
  updateLocalStorage();
  init(); // Re-initialize to update the display after removal
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  list.innerHTML = ''; // Clear existing list items before re-rendering
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Event Listeners
form.addEventListener('submit', addTransaction);

// Initial call to set up the UI
init();