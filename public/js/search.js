//search by keyword
const searchBar = document.getElementById('search-bar');
const blogs = document.getElementsByClassName("blog-title");
const tagContainer = document.getElementsByClassName("blog-tags");
const tagsList = document.querySelector(".tags-list");


let iter = 0;
searchBar.addEventListener("input", (e) => {
    let query = searchBar.value.toLowerCase();
    if (query.length == 0) {
        for (let i = 0; i < blogs.length; i++) {
            blogs[i].parentNode.parentNode.style.display = "block";
        }
        return;
    }
    let blogFound;
    for (let i = 0; i < blogs.length; i++) {
        blogFound = false;
        blogs[i].textContent.toLowerCase().split(" ").forEach((word) => {
            if (word.toLowerCase().includes(query)) {
                blogs[i].parentNode.parentNode.style.display = "block";
                blogFound = true;
            }
        })
        if (!blogFound) {
            blogs[i].parentNode.parentNode.style.display = "none";
        }
    }

})

/*
    Dropdown with Multiple checkbox select with jQuery - May 27, 2013
    (c) 2013 @ElmahdiMahmoud
    license: https://www.opensource.org/licenses/mit-license.php
*/

const dropdown = document.querySelector(".dropdown");
const dropdownDt = dropdown.querySelector("dt a");
const dropdownDdUl = dropdown.querySelector("dd ul");
const dropdownDdUlLiA = dropdown.querySelectorAll("dd ul li a");
const multiSelect = document.querySelector('.mutliSelect');
const multiSelectInputs = multiSelect.querySelectorAll('input[type="checkbox"]');
const dropdownDtA = dropdown.querySelector("dt a");
const multiSel = document.querySelector('.multiSel');
const hida = document.querySelector(".hida");

dropdownDt.addEventListener('click', function () {
    dropdownDdUl.style.display = dropdownDdUl.style.display === 'none' ? 'block' : 'none';
});

dropdownDdUlLiA.forEach(function (li) {
    li.addEventListener('click', function () {
        dropdownDdUl.style.display = 'none';
    });
});

function getSelectedValue(id) {
    return document.querySelector("#" + id + " dt a span.value").innerHTML;
}

document.addEventListener('click', function (e) {
    var clicked = e.target;
    if (!clicked.closest('.dropdown')) {
        dropdownDdUl.style.display = 'none';
    }
});

let checkedTags = [];


db.collection("metadata").doc("blogs-metadata").get().then((data) => {
    let metadata = data.data();
    let tags = metadata.tags
    tags.forEach((tag) => {
        tagsList.innerHTML += `<li><input type="checkbox" value="${tag}" onclick="onClick()"/>${tag}</li>`
    })
})

function onClick(){
    console.log("click")
    clickedEl = event.target;
    if (clickedEl.checked) {
        checkedTags.push(clickedEl.value.toLowerCase());
    } else {
        checkedTags.splice(checkedTags.indexOf(clickedEl.value.toLowerCase()), 1)
    }
    filterByTag(clickedEl.value.toLowerCase());
    if (checkedTags.length == 0) {
        viewAll();
    }
}


function filterByTag(array, tag) {
    let blogFound;
    for (let i = 0; i < blogs.length; i++) {
        blogFound = false;
        tagContainer[i].querySelectorAll("a").forEach((tagA) => {
            if (checkedTags.includes(tagA.textContent.toLowerCase())) {
                blogs[i].parentNode.parentNode.style.display = "block";
                blogFound = true;
            }
            if (!blogFound) {
                blogs[i].parentNode.parentNode.style.display = "none";
            }
        })
    }
}

function viewAll() {
    for (let i = 0; i < blogs.length; i++) {
        blogs[i].parentNode.parentNode.style.display = "block";
    }
    checkedTags = [];
    dropdownDtA.appendChild(hida);
}
