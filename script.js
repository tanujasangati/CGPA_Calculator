let subjects = [];

function addSubject() {
  const subject = document.getElementById("subject").value.trim();
  const grade = document.getElementById("grade").value;
  const credit = parseInt(document.getElementById("credit").value);

  if (!subject || isNaN(credit)) return;

  subjects.push({ subject, grade, credit });
  renderSubjects();
}

function renderSubjects() {
  const tbody = document.getElementById("subjectList");
  tbody.innerHTML = "";
  subjects.forEach((s, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${s.subject}</td>
        <td>${s.grade}</td>
        <td>${s.credit}</td>
        <td><button onclick="deleteSubject(${i})">Delete</button></td>
      </tr>`;
  });
}

function deleteSubject(index) {
  subjects.splice(index, 1);
  renderSubjects();
}

function calculateCGPA() {
  if (subjects.length === 0) return;

  let totalCredits = 0, totalPoints = 0;
  const gradeMap = { S: 10, A: 9, B: 8, C: 7, D: 6, F: 0 };

  subjects.forEach(s => {
    totalCredits += s.credit;
    totalPoints += gradeMap[s.grade] * s.credit;
  });

  const cgpa = totalPoints / totalCredits;
  document.getElementById("cgpa").textContent = cgpa.toFixed(2);
}

function resetForm() {
  subjects = [];
  renderSubjects();
  document.getElementById("cgpa").textContent = "0.00";
}
