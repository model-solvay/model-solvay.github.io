const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");
const logoText = document.querySelector(".navbar-logo-text");

navbarToggle.addEventListener("click", () => {
    navbarToggle.classList.toggle("active");
    navbarMenu.classList.toggle("active");
});

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const scrollTop = window.pageYOffset;

    if (scrollTop > 100) {
        navbar.classList.add("shrink");
        logoText.textContent = "MSC 2023";
    } else {
        navbar.classList.remove("shrink");
        logoText.textContent = "Model Solvay Conference 2023";
    }
});