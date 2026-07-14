document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");

    const courses = document.querySelectorAll(".course");


    searchInput.addEventListener("input", function () {

        const searchText = searchInput.value.toLowerCase().trim();


        courses.forEach(function(course){

            let found = false;


            const details = course.querySelectorAll("details");


            details.forEach(function(detail){

                const items = detail.querySelectorAll("li");

                let detailFound = false;


                items.forEach(function(item){

                    const text = item.textContent.toLowerCase();


                    if(text.includes(searchText) || searchText === ""){

                        item.style.display = "";

                        detailFound = true;

                    }
                    else{

                        item.style.display = "none";

                    }

                });


                if(detailFound){

                    detail.style.display = "";

                    detail.open = true;

                    found = true;

                }
                else{

                    detail.style.display = "none";

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