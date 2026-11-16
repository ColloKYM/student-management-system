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

document.addEventListener("DOMContentLoaded,", () => {
    setupMobileMenu();
    if(document.getElementById("registration-form")){
        initDashboard();
    }
    if(document.getElementById("contact-form")){
    initContactForm();
}
});

function setupMobileMenu() {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");

    if(hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click",() => {
            navLinks.classList.toggle("show");
        })
    }
}

function initDashboard(){
    const regForm = document.getElementById("registartion-form");
    const searchInput = document.getElementById("search-input")

    renderStudents(students);
    updateStatistics(students);
}

regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("fullname").ariaValueMax.trim();
    const age = Number(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const course = document.getElementById("course").value;
    const marks = Number(document.getElementById("marks").value);
    const alertBox = document.getElementById("form-alert");

    if(!name || !age || !gender || !course || !marks === ""){
        showAlert(alertBox, "Error:All required fields must be filled.", "error");
        return;}
          if(isNaN(age) || age <= 0 || age >100) {
            showAlert(alertBox, "Error:Please enter a valid age.", "error");
        }
          if(isNaN(marks) || age <= 0 || age >100) {
            showAlert(alertBox, "Error:Please enter a valid age.", "error");
        }
})