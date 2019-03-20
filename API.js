

const baseURL = 'https://api.edamam.com/search';
const key = '02886e8fe0884533cf5c36b25180402e';
const appID = '7fbd091a'
let url;

const searchTerm = document.querySelector('.search');
const body = document.querySelector("body");
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const nav = document.querySelector('nav');
const section = document.querySelector('section');

// let pageNumber = 0;
// let displayNav = false;

searchForm.addEventListener('submit', fetchResults);


function nextPage(e) {
    pageNumber++;
    fetchResults(e);
};

function previousPage(e) {
    if (pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
};

function fetchResults(e) {
    e.preventDefault();
    pageNumber = 0;
    url = `${baseURL}?q=${searchTerm.value}&app_id=${appID}&app_key=${key}`;
    console.log('URL:', url);
    fetch(url)
        .then(function (result) {
            console.log(result)
            return result.json();
        })
        .then(function (json) {
            console.log(json);
            displayResults(json);
        })
}
function displayResults(json) {
    while (section.firstChild) { 
        section.removeChild(section.firstChild);
        console.log('Display Results', json);
        console.log(json.hits);
    }

    let recipiesList = json.hits;
    for (r of recipiesList) {
        let img = document.createElement('img');
        let label = document.createElement('h3');
        let cal = document.createElement("h2");
        let clearfix = document.createElement('div');
        let dietLabels = document.createElement('h2');
        let healthLabels = document.createElement('h2');
        label.innerText = r.recipe.label;
        img.src = r.recipe.image;
        dietLabels.innerText = r.recipe.dietLabels;
        healthLabels.innerText = r.recipe.healthLabels;
        let calcount = Math.round(r.recipe.calories);
        cal.innerText = calcount + " Calories" + (` are in ${r.recipe.label}.`);
        dietLabels.innerText = (`${r.recipe.label} is a ${r.recipe.dietLabels} meal choice.`)
        healthLabels.innerText = (`Allergy/Dietary Notes: ${r.recipe.healthLabels}.`)
        clearfix.setAttribute('class', 'clearfix');
        body.appendChild(clearfix);
        section.appendChild(label);
        section.appendChild(img);
        section.appendChild(cal);
        section.appendChild(dietLabels);
        section.appendChild(healthLabels);




        let ing = r.recipe.ingredients /*EXPLAIN THIS LAST PART*/

        for (i in ing) {
            let ingredients = document.createElement("h4");
            console.log(ing[i]);
            ingredients.innerHTML = "<span>" + ing[i].text + "</span>";
            section.appendChild(ingredients);
        }

    }
}