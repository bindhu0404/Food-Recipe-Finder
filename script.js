
const searchInput = document.querySelector('#search');
const submitButton = document.querySelector('#submit');
const resultsList = document.querySelector('#results');

submitButton.addEventListener('click', searchRecipes);


async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?q=${searchValue}&app_id=75ecf4ef&app_key=622af0edd59d83ed77b1f4c2a116ad06&from=0&to=10&type=public`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `
    })
    resultsList.innerHTML = html;
}