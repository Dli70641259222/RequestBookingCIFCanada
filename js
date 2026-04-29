// Employees list (Hojeij added)
const employees = ["Ali", "Layla", "Ali Fadlallah", "Khodor", "Hadi", "Hojeij"];

// Create table rows
function createTable() {
  const body = document.getElementById("tableBody");

  employees.forEach((name, index) => {
    let row = `<tr>
      <td class="font-bold">${name}</td>`;

    for (let i = 0; i < 6; i++) {
      row += `
      <td>
        <input type="time" class="in w-full" onchange="calculate()">
        <input type="time" class="out w-full" onchange="calculate()">
      </td>`;
    }

    row += `<td id="total${index}">0</td></tr>`;
    body.innerHTML += row;
  });
}

// Calculate totals
function calculate() {

  // Reset daily totals
  for (let d = 1; d <= 6; d++) {
    document.getElementById("d" + d).textContent = 0;
  }

  // Loop employees
  document.querySelectorAll("#tableBody tr").forEach((row, index) => {

    let empTotal = 0;

    for (let d = 0; d < 6; d++) {

      const inTime = row.querySelectorAll(".in")[d].value;
      const outTime = row.querySelectorAll(".out")[d].value;

      if (inTime && outTime) {

        const [h1, m1] = inTime.split(":").map(Number);
        const [h2, m2] = outTime.split(":").map(Number);

        // subtract 30 min break automatically
        let minutes = (h2 * 60 + m2) - (h1 * 60 + m1) - 30;

        if (minutes > 0) {
          empTotal += minutes;

          let dayCell = document.getElementById("d" + (d + 1));
          dayCell.textContent = (parseFloat(dayCell.textContent) + minutes / 60).toFixed(2);
        }
      }
    }

    document.getElementById("total" + index).textContent = (empTotal / 60).toFixed(2);
  });
}

// Init table
createTable();
