document.getElementById("expForm").addEventListener("submit", addExpense);


const expenses = JSON.parse(localStorage.getItem("expenses"));
const newf = JSON.parse(localStorage.getItem("newf")) ;


let newfri = document.getElementById("newfriend");
newfri.addEventListener("click", (e) => {
  let adding = prompt("Enter the friend's name");
  var select = document.getElementById("createfriend"),
    newoption = document.createElement("option"),
    addingoption = document.createTextNode(adding);

  if (adding === "") {
    alert("Please Enter the Name");
    return false;
  } else {
    newoption.appendChild(addingoption);
    select.insertBefore(newoption, select.firstChildNode);
    newf.push(adding);
  }


  localStorage.setItem("newf", JSON.stringify(newf));
  displayfriend();
});


const displayfriend = () => {
  const friendsTable = document.getElementById("createfriend"); 
  friendsTable.innerHTML = "";
  if (newf.length > 0) {
    for (let i = 0; i < newf.length; i++) {
      friendsTable.innerHTML += `<option value=${newf[i]}>${newf[i]}</option>`;
    }
  }

  const friendsTable2 = document.getElementById("createfriend2"); 
  friendsTable2.innerHTML = "";
  if (newf.length > 0) {
    for (let i = 0; i < newf.length; i++) {
      friendsTable2.innerHTML += `<option value=${newf[i]}>${newf[i]}</option>`;
    }
  }
};


function addExpense(e) {
  e.preventDefault();

  
  let type = document.getElementById("type").value;
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let currency = document.getElementById("currency").value;
  let amount = document.getElementById("amount").value;
  let newfriend = document.getElementById("createfriend").value;


  if (type === "") {
    document.querySelector(".err-type").style.opacity = 1;
  
  } else {
    document.querySelector(".err-type").style.opacity = 0;
  }

  if (name ==="") {
    document.querySelector(".err-name").style.opacity = 1;
 
  } else {
    document.querySelector(".err-name").style.opacity = 0;
  }

  if (currency === "") {
    document.querySelector(".err-currency").style.opacity = 1;

  } else {
    document.querySelector(".err-currency").style.opacity = 0;
  }


  if (amount === "" || isNaN(amount)) {
    document.querySelector(".err-amount").style.opacity = 1;
    
  } else {
    document.querySelector(".err-amount").style.opacity = 0;
  }

  if (date === "") {
    document.querySelector(".err-date").style.opacity = 1;
   
  } else {
    document.querySelector(".err-date").style.opacity = 0;
  }




  if (name.length > 0 && date != 0 && amount > 0) {
    const expense = {
      type,
      name,
      date,
      amount,
      newfriend,
      currency,
      id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
    };
    console.log(expense.id);

    expenses.push(expense);
    
    localStorage.setItem("expenses", JSON.stringify(expenses));
    document.getElementById("expForm").reset();
  }

  displayexpense();
}


const displayexpense = () => {
  let sign;
  const expenseTable = document.getElementById("expenseTable");

  expenseTable.innerHTML = "";
  if (expenses.length > 0) {
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].currency === "USD") {
        sign = "$";
      }

      expenseTable.innerHTML += `
            <tr id="${i}editindex">
                <td id="${i}_type" class="data" style="text-align:center">${expenses[i].type}</td>
                <td id="${i}_name" class="data" style="text-align:center">${expenses[i].name}</td>
                <td id="${i}_newfriend" class="data" style="text-align:center">${expenses[i].newfriend}</td>
                <td id="${i}_date" class="data" style="text-align:center">${expenses[i].date}</td>
                <td id="${i}_amount" class="data" style="text-align:center">${sign} ${expenses[i].amount}</td>
                <td style="text-align:center"><a id="${i}neweditBtn" class="edit" style="cursor: pointer;" onclick="edit(${i});">Edit expense</a></td>
                <td style="text-align:center"><a class="delete" style="cursor: pointer;" onclick="deleteExpense(${expenses[i].id})">Delete</a></td>
            </tr>
        `;
    }
  } else {
    
    expenseTable.appendChild(createEmptyRow());
  }
};


function createEmptyRow() {
  const expenseRow = document.createElement("tr");
  const expenseTdType = document.createElement("td");
  expenseTdType.setAttribute("colspan", 7);
  expenseTdType.textContent = "Your added items will show up here!";
  expenseTdType.style.textAlign = "center";
  expenseRow.appendChild(expenseTdType);
  return expenseRow;
}


const deleteExpense = (id) => {
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id == id) {
      confirm(expenses.splice(i, 1))
    }
  }

  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayexpense();
};

let editing = false;

function edit(i) {
  if (!editing) {
    const editBtn = document.getElementById(`${i}neweditBtn`);
    editBtn.innerText = "Done";
    editBtn.style.color = 'green';
    let e = document.getElementById(i + "editindex");
    e.contentEditable = "true";
    editing = true;
  } else {
    const editBtn = document.getElementById(`${i}neweditBtn`);
    editBtn.innerText = "Edit";
    let e = document.getElementById(i + "editindex");
    e.contentEditable = "false";
    editing = false;

    const typeValue = document.getElementById(`${i}_type`).innerText;
    const nameValue = document.getElementById(`${i}_name`).innerText;
    const newfriendValue = document.getElementById(`${i}_newfriend`).innerText;
    const dateValue = document.getElementById(`${i}_date`).innerText;
    const amountValue = document
      .getElementById(`${i}_amount`)
      .innerText.replace(/\D/g, "");

    expenses[i].type = typeValue;
    expenses[i].name = nameValue;
    expenses[i].newfriend = newfriendValue;
    expenses[i].date = dateValue;
    expenses[i].amount = amountValue;

    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayexpense();
  }
}

function filternameByFunction() {
  var input = document.getElementById("createfriend2");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("myTable");
  var tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


function filtercurrencyByFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("currency2");
  filter = input.value;
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      if (td.innerHTML.indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

displayexpense();
displayfriend();
