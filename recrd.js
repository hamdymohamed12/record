const form = document.getElementById('debtForm');
const tableBody = document.querySelector('#debtTable tbody');
let debts = JSON.parse(localStorage.getItem('debts') || '[]');


function saveDebts() {
localStorage.setItem('debts', JSON.stringify(debts));
}


function renderTable() {
tableBody.innerHTML = '';
debts.forEach((debt, index) => {
const row = document.createElement('tr');
row.innerHTML = `
<td contenteditable="true" oninput="updateName(${index}, this.innerText)">${debt.name}</td>
<td contenteditable="true" oninput="updateAmount(${index}, this.innerText)">${debt.amount}</td>
<td><button class="btn-danger" onclick="deleteDebt(${index})">حذف</button></td>
`;
tableBody.appendChild(row);
});
}


function updateName(index, value) {
debts[index].name = value;
saveDebts();
}


function updateAmount(index, value) {
debts[index].amount = value;
saveDebts();
}


function deleteDebt(index) {
debts.splice(index, 1);
saveDebts();
renderTable();
}


form.addEventListener('submit', (e) => {
e.preventDefault();
const name = document.getElementById('name').value;
const amount = document.getElementById('amount').value;
debts.push({ name, amount });
saveDebts();
renderTable();
form.reset();
});


renderTable();