/* ==========================================================
   HOME PAGE
========================================================== */

document.getElementById("year").innerText =
    new Date().getFullYear();
















/* ==========================================================
   DARK MODE
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const themeButton = document.getElementById("themeToggle");

    if (!themeButton) return;

    // Restore saved theme
    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");
        themeButton.textContent = "☀️";

    }

    // Toggle theme
    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");
            themeButton.textContent = "☀️";

        } else {

            localStorage.setItem("theme", "light");
            themeButton.textContent = "🌙";

        }

    });

});