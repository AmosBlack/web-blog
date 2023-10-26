//search by keyword
const searchBar = document.getElementById('search-bar');
const blogs = document.getElementsByClassName("blog-title");
const tagContainer = document.getElementsByClassName("blog-tags");

let iter = 0;
searchBar.addEventListener("input", (e)=>{
    let query = searchBar.value.toLowerCase();
    if(query.length == 0){
        for(let i=0; i<blogs.length; i++){
            blogs[i].parentNode.parentNode.style.display = "block";
        }
        return;
    }
    let blogFound;
    for(let i=0; i<blogs.length; i++){
        blogFound = false;
        blogs[i].textContent.toLowerCase().split(" ").forEach((word)=>{
            if(word.toLowerCase().includes(query)){
                blogs[i].parentNode.parentNode.style.display = "block";
                blogFound = true;
            }
        })
        if(!blogFound){
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

dropdownDt.addEventListener('click', function() {
    dropdownDdUl.style.display = dropdownDdUl.style.display === 'none' ? 'block' : 'none';
});

dropdownDdUlLiA.forEach(function(li) {
    li.addEventListener('click', function() {
        dropdownDdUl.style.display = 'none';
    });
});

function getSelectedValue(id) {
    return document.querySelector("#" + id + " dt a span.value").innerHTML;
}

document.addEventListener('click', function(e) {
    var clicked = e.target;
    if (!clicked.closest('.dropdown')) {
        dropdownDdUl.style.display = 'none';
    }
});

let checkedTags = [];

multiSelectInputs.forEach(function(input) {
    input.addEventListener('click', function() {
        if(input.value == "view-all"){
            viewAll();
            return;
        }
        var title = input.value + ",";
        if (input.checked) {
            checkedTags.push(input.value.toLowerCase());
            var html = '<span title="' + title + '">' + title + '</span>';
            multiSel.insertAdjacentHTML('beforeend', html);
            hida.style.display = 'none';
        } else {
            console.log(checkedTags);
            checkedTags.splice(checkedTags.indexOf(input.value.toLowerCase()),1)
            // checkedTags.filter((tag)=>tag!=input.value.toLowerCase());
            // removeByTag(input.value.toLowerCase());
            console.log(checkedTags)
            var span = multiSel.querySelector('span[title="' + title + '"]');
            span.parentNode.removeChild(span);
            dropdownDtA.appendChild(hida);
        }
        filterByTag(input.value.toLowerCase());
    });
});

function filterByTag(array,tag){
    let blogFound;
    for(let i=0; i<blogs.length; i++){
        blogFound = false;
        tagContainer[i].querySelectorAll("a").forEach((tagA)=>{
            if(checkedTags.includes(tagA.textContent.toLowerCase())){
                blogs[i].parentNode.parentNode.style.display = "block";
                blogFound = true;
            }
            if(!blogFound){
                blogs[i].parentNode.parentNode.style.display = "none";
            }
        })
    }
}

function viewAll(){
    for(let i=0; i<blogs.length; i++){
        blogs[i].parentNode.parentNode.style.display = "block";
    }
    checkedTags = [];
    multiSel.innerHTML = "";
    dropdownDtA.appendChild(hida);
}
