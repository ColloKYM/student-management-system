let students = [
    {
        id: 1, name: "Mary Wanjiku", age: 21, gender: "Female",
        course: "Software Development", marks: 85
    },
    {
        id: 1, name: "Caleb Chege", age: 23, gender: "Male",
        course: "Software Development", marks: 65
    }
];

document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    if (document.getElementById("registration-form")) {
        initDashboard();
    }
    if (document.getElementById("contact-form")) {
        initContactForm();
    }
});

function setupMobileMenu() {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }
}

function initDashboard() {
    const regForm = document.getElementById("registration-form");
    const searchInput = document.getElementById("search-input");

    renderStudents(students);
    updateStatistics(students);

    regForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("fullname").value.trim();
        const age = Number(document.getElementById("age").value);
        const gender = document.getElementById("gender").value;
        const course = document.getElementById("course").value;
        const marks = Number(document.getElementById("marks").value);
        const alertBox = document.getElementById("form-alert");

        if (!name || !age || !gender || !course || document.getElementById("marks").value === "") {
            showAlert(alertBox, "Error:All required fields must be filled.", "error");
            return;
        }
        if (isNaN(age) || age <= 0 || age > 100) {
            showAlert(alertBox, "Error:Please enter a valid age.", "error");
            return;
        }
        if (isNaN(marks) || age < 0 || age > 100) {
            showAlert(alertBox, "Error:Marks must be between 0 and 100.", "error");
            return;
        }

        const newStudent = {
            id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
            name,
            age,
            gender,
            course,
            marks
        };
        students.push(newStudent);
        showAlert(alertBox, "Success: Student registered successfull!", "success");
        regForm.reset();
        renderStudents(students);
        updateStatistics(students);
    });
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = students.filter(s => s.name.toLocaleLowerCase().includes(query));
        renderStudents(filtered);
    });
}

function getPerformance(marks) {
    if (marks >= 80) return { label: "Excellent", badge: "badge-excellent", passed: true };
    if (marks >= 70) return { label: "Very Good", badge: "badge-very-good", passed: true };
    if (marks >= 60) return { label: "Good", badge: "badge-good", passed: true };
    if (marks >= 50) return { label: "Average", badge: "badge-average", passed: true };
    return { label: "Failed", badge: "badge-failed", passed: false };
}
function renderStudents(list) {
    const tbody = document.getElementById("student-table-body");
    tbody.innerHTML = "";
    if (list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #64748b;" > No matching student records found.</td></tr>';

        return;
    }
    list.forEach(student => {
        const perf = getPerformance(student.marks);
        const tr = document.createElement("tr");

        tr.innerHTML = `
  <td>${student.name}</td>
  <td>${student.age}</td>
  <td>${student.gender}</td>
  <td>${student.course}</td>
  <td>${student.marks}</td>
  <td><span class="badge ${perf.badge}">${perf.label}</span></td>
  <td>
    <button class="btn" onclick="updateMarks(${student.id})">Update</button>
    <button class="btn btn-danger" onclick="deleteStudent(${student.id})">Delete</button>
  </td>
`;

        tbody.appendChild(tr);
    });
}

window.updateMarks = function (id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    const newMarksInput = prompt('Enter new marks for ${student.name} (0-100):', student.marks);
    if (newMarksInput === null) return;
    const newMarks = Number(newMarksInput);
    if (isNaN(newMarks) || newMarks < 0 || newMarks > 100) {
        alert("Invalid marks entered. Must be between 0 and 100.");
        return;
    }
    student.marks = newMarks;
    renderStudents(students);
    updateStatistics(students);
}

window.deleteStudent = function (id) {
    if (confirm(" Are you sure you want to delete this student record?")) {
        students = students.filter(s => s.id !== id);
        renderStudents(students);
        updateStatistics(students);
    }
}

function updateStatistics(list) {
    const total = list.length;
    let passed = 0;
    let failed = 0;
    const totalMarks = list.reduce((sum, s) => sum + s.marks, 0);
    const avg = total > 0 ? (totalMarks / total).toFixed(1) : 0;
    list.forEach(s => {
        if (getPerformance(s.marks).passed) {
            passed++;
        } else {
            failed++;
        }
    });
    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-passed").textContent = passed;
    document.getElementById("stat-failed").textContent = failed;
    document.getElementById("stat-avg").textContent = avg + "%";
}

function showAlert(element, message, type) {
    element.textContent = message;
    element.className = `alert-box alert-${type}`;
    element.style.display = "block";
    setTimeout(() => {
        element.style.display = "none";
    }, 4000);
}
function initContactForm() {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();
        const alertBox = document.getElementById("contact-alert");

        if (!name || !email || !subject || !message) {
            showAlert(alertBox, "Error: All fields are required.", "error");
            return;
        }
        if (!email.includes("@") || !email.includes(".")) {
            showAlert(alertBox, "Error: Please enter a valid email address containing '@' and a dot.", "error");
            return;
        }

        if (message.length < 10) {
            showAlert(alertBox, "Error: Message must be at least 10 characters long.", "error");
            return;
        }

        showAlert(alertBox, "Thank you! Your message has been sent successfully.", "success");
        contactForm.reset();
    });
}





