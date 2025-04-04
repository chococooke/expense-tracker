let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        let editId = null;

        function save() {
            localStorage.setItem('expenses', JSON.stringify(expenses));
        }

        function display() {
            const list = document.getElementById('list');
            list.innerHTML = ''; 

            expenses.forEach(expense => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}</span>
                    <span>
                        <button onclick="edit(${expense.id})">Edit</button>
                        <button onclick="deleteExpense(${expense.id})">Delete</button>
                    </span>
                `;
                list.appendChild(li);
            });
        }

        document.getElementById('form').addEventListener('submit', function (e) {
            e.preventDefault();

            const amount = Number(document.getElementById('amount').value);
            const description = document.getElementById('description').value;
            const category = document.getElementById('category').value;

            if (editId !== null) {
                const expense = expenses.find(exp => exp.id === editId);
                expense.amount = amount;
                expense.description = description;
                expense.category = category;
                editId = null;
                document.getElementById('submitBtn').textContent = 'Add Expense';
                document.getElementById('cancelBtn').style.display = 'none';
            } else {
                const expense = {
                    id: Date.now(),
                    amount: amount,
                    description: description,
                    category: category
                };
                expenses.push(expense);
            }

            save();
            display();
            document.getElementById('form').reset();
        });

        function deleteExpense(id) {
            expenses = expenses.filter(expense => expense.id !== id);
            save();
            display();
        }

        function edit(id) {
            const expense = expenses.find(exp => exp.id === id);
            document.getElementById('amount').value = expense.amount;
            document.getElementById('description').value = expense.description;
            document.getElementById('category').value = expense.category;
            editId = id;
            document.getElementById('submitBtn').textContent = 'Update Expense';
            document.getElementById('cancelBtn').style.display = 'inline-block';
        }

        document.getElementById('cancelBtn').addEventListener('click', function () {
            editId = null;
            document.getElementById('submitBtn').textContent = 'Add Expense';
            document.getElementById('cancelBtn').style.display = 'none';
            document.getElementById('form').reset();
        });

        display();