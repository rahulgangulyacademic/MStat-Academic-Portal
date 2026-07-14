console.log("rows:", document.querySelectorAll("tbody tr").length);


document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("dailySearch");


    searchInput.addEventListener("input", function () {


        const searchText = searchInput.value.toLowerCase().trim();


        const courses = document.querySelectorAll(".course");


        courses.forEach(function(course){


            let found = false;


            const rows = course.querySelectorAll("tbody tr");


            rows.forEach(function(row){


                const rowText = (
    row.innerText +
    " " +
    Array.from(row.querySelectorAll("input"))
        .map(input => input.value)
        .join(" ")
).toLowerCase();


                if(rowText.includes(searchText) || searchText === ""){


                    row.style.display = "";


                    found = true;


                }
                else{


                    row.style.display = "none";


                }


            });



            if(found || searchText === ""){


                course.style.display = "";


            }
            else{


                course.style.display = "none";


            }


        });


    });


});