/* ==========================================================
   DAILY TRACKER
   PART 1
   Creates all lecture rows automatically
========================================================== */

const courses = [
    { id: "stochastic", lectures: 28 },
    { id: "multivariate", lectures: 28 },
    { id: "inference", lectures: 28 },
    { id: "categorical", lectures: 28 },
    { id: "regression", lectures: 28 }
];

createTables();
restoreData();

/* ==========================================================
   CREATE TABLES
========================================================== */

function createTables() {

    courses.forEach(course => {

        const tbody = document.getElementById(course.id);

        if (!tbody) return;

        tbody.innerHTML = "";

        for (let i = 1; i <= course.lectures; i++) {

            const row = document.createElement("tr");

            row.innerHTML = `

                <td>Lecture ${i}</td>

                <td>
                    <input
                        type="date"
                        class="date"
                        id="${course.id}_date_${i}">
                </td>

                <td>
                    <input
                        type="text"
                        class="topic"
                        id="${course.id}_topic_${i}"
                        placeholder="Enter Topic">
                </td>

                <td>
                    <input
                        type="checkbox"
                        class="task"
                        id="${course.id}_attend_${i}">
                </td>

                <td>
                    <input
                        type="checkbox"
                        class="task"
                        id="${course.id}_understand_${i}">
                </td>

                <td>
                    <input
                        type="checkbox"
                        class="task"
                        id="${course.id}_revision_${i}">
                </td>

                <td>
                    <input
                        type="checkbox"
                        class="task"
                        id="${course.id}_notes_${i}">
                </td>

                <td class="daily-progress">

                    0%

                </td>

            `;

            tbody.appendChild(row);

        }

    });

}

/* ==========================================================
   RESTORE LOCAL STORAGE
========================================================== */

function restoreData() {

    document.querySelectorAll("input").forEach(input => {

        const value = localStorage.getItem(input.id);

        if (value !== null) {

            if (input.type === "checkbox") {

                input.checked = value === "true";

            }

            else {

                input.value = value;

            }

        }

        input.addEventListener("change", saveInput);

        input.addEventListener("input", saveInput);

    });

}

/* ==========================================================
   SAVE
========================================================== */

function saveInput(event) {

    const input = event.target;

    if (input.type === "checkbox") {

        localStorage.setItem(input.id, input.checked);

    }

    else {

        localStorage.setItem(input.id, input.value);

    }

}

/* ==========================================================
   DOUBLE CLICK DATE = TODAY
========================================================== */

document.addEventListener("dblclick", function(e){

    if(e.target.classList.contains("date")){

        const today = new Date();

        e.target.value = today.toISOString().split("T")[0];

        localStorage.setItem(
            e.target.id,
            e.target.value
        );

    }

});

console.log("Daily Tracker Loaded");













/* ==========================================================
   DAILY TRACKER
   PART 2
========================================================== */

/* ---------- UPDATE ONE ROW ---------- */

function updateRow(row){

    const boxes = row.querySelectorAll(".task");

    let checked = 0;

    boxes.forEach(box => {

        if(box.checked) checked++;

    });

    const percent = Math.round((checked / boxes.length) * 100);

    const progress = row.querySelector(".daily-progress");

    progress.innerText = percent + "%";

    /* Remove previous styles */

    progress.className = "daily-progress";
    row.classList.remove("completed-row","partial-row");

    if(percent == 100){

        progress.classList.add("daily-high");
        row.classList.add("completed-row");

    }

    else if(percent > 0){

        progress.classList.add("daily-medium");
        row.classList.add("partial-row");

    }

    else{

        progress.classList.add("daily-low");

    }

}

/* ---------- UPDATE COURSE ---------- */

function updateCourse(course){

    const rows = course.querySelectorAll("tbody tr");

    let total = 0;

    rows.forEach(row=>{

        total += parseInt(
            row.querySelector(".daily-progress").innerText
        );

    });

    const avg = Math.round(total / rows.length);

    course.querySelector(".coursePercent").innerText =
        avg + "%";

    const bar = course.querySelector(".courseBar");

    bar.style.width = avg + "%";

}

/* ---------- UPDATE OVERALL ---------- */

function updateOverall(){

    const all = document.querySelectorAll(".coursePercent");

    let total = 0;

    all.forEach(item=>{

        total += parseInt(item.innerText);

    });

    const avg = Math.round(total / all.length);

    document.getElementById("overallPercent").innerText =
        avg + "%";

    document.getElementById("overallProgress").style.width =
        avg + "%";

}

/* ---------- REFRESH EVERYTHING ---------- */

function refreshAll(){

    document.querySelectorAll("tbody tr").forEach(row=>{

        updateRow(row);

    });

    document.querySelectorAll(".course").forEach(course=>{

        updateCourse(course);

    });

   updateOverall();

updateDashboard();

}

/* ---------- LISTENERS ---------- */

document.querySelectorAll(".task").forEach(box=>{

    box.addEventListener("change",()=>{

        saveInput({target:box});

        const row = box.closest("tr");

        updateRow(row);

        updateCourse(box.closest(".course"));

        updateOverall();

        updateDashboard();

    });

});
/* ---------- INITIAL LOAD ---------- */

refreshAll();

















/* ==========================================================
   DAILY TRACKER
   PART 3
   Extra Features
========================================================== */


/* ==========================================================
   COLLAPSE / EXPAND COURSE
========================================================== */

document.querySelectorAll(".course-header").forEach(header => {

    header.addEventListener("click", function () {

        const course = this.closest(".course");

        course.classList.toggle("collapsed");

    });

});


/* ==========================================================
   BACK TO TOP BUTTON
========================================================== */

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    }
    else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ==========================================================
   AUTO FOCUS TO TOPIC AFTER DATE
========================================================== */

document.querySelectorAll(".date").forEach(date => {

    date.addEventListener("change", function () {

        const topic = this.closest("tr").querySelector(".topic");

        topic.focus();

    });

});


/* ==========================================================
   DOUBLE CLICK DATE = TODAY
========================================================== */

document.querySelectorAll(".date").forEach(date => {

    date.addEventListener("dblclick", function () {

        const today = new Date();

        this.value = today.toISOString().split("T")[0];

        localStorage.setItem(this.id, this.value);

    });

});


/* ==========================================================
   LAST UPDATED
========================================================== */

function saveLastUpdated(){

    const now = new Date();

    const options = {

        day: "2-digit",

        month: "short",

        year: "numeric",

        hour: "2-digit",

        minute: "2-digit"

    };

    localStorage.setItem(

        "lastUpdated",

        now.toLocaleString("en-IN", options)

    );

    updateDashboard();

}
document.querySelectorAll("input").forEach(input=>{

    input.addEventListener("change",saveLastUpdated);

    input.addEventListener("input",saveLastUpdated);

});


/* ==========================================================
   RESET TRACKER
========================================================== */

function resetTracker(){

    const ans = confirm(

        "Delete all saved tracker data?"

    );

    if(!ans) return;

    localStorage.clear();

    location.reload();

}


/* ==========================================================
   KEYBOARD SHORTCUT
========================================================== */

document.addEventListener("keydown",function(e){

    if(e.ctrlKey && e.shiftKey && e.key==="R"){

        e.preventDefault();

        resetTracker();

    }

});


/* ==========================================================
   REFRESH ON PAGE LOAD
========================================================== */

refreshAll();















/* ==========================================================
   DASHBOARD
========================================================== */

/* ==========================================================
   DASHBOARD
========================================================== */

function updateDashboard(){

    const totalLectures = document.querySelectorAll("tbody tr").length;

    let completed = 0;

    let checkedTasks = 0;

    let totalTasks = 0;


    document.querySelectorAll("tbody tr").forEach(row=>{

        /* Count completed lectures */

        const percent = parseInt(
            row.querySelector(".daily-progress").innerText
        );

        if(percent === 100){

            completed++;

        }

        /* Count completed tasks */

        const boxes = row.querySelectorAll(".task");

        totalTasks += boxes.length;

        boxes.forEach(box=>{

            if(box.checked){

                checkedTasks++;

            }

        });

    });


    /* Dashboard values */

    document.getElementById("totalLectures").innerText =
        totalLectures;

    document.getElementById("completedLectures").innerText =
        completed;

    document.getElementById("remainingLectures").innerText =
        totalLectures - completed;

    document.getElementById("tasksDone").innerText =
        checkedTasks + " / " + totalTasks;

    const progress = totalLectures === 0
        ? 0
        : Math.round((completed / totalLectures) * 100);

    document.getElementById("dashboardProgress").innerText =
    progress + "%";

const last = localStorage.getItem("lastUpdated");

document.getElementById("lastUpdated").innerText =
    last ? last : "Never";

}

console.log("Daily Tracker Ready");


