let app = document.getElementById("app");

const getRecipes = (callback) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };
  xhr.open("GET", "https://dummyjson.com/recipes");
  xhr.send();
};

const getRecipesByMealType = (mealType, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };
  xhr.open("GET", `https://dummyjson.com/recipes/meal-type/${mealType}`);
  xhr.send();
};

const createRecipesSection = () => {
 let section = createElement("section", [
  "my-3", "mx-auto", "w-[80%]"
]);
  section.id = "recipes";

  let title = createElement("h1", [
    "text-3xl", "font-medium", "text-gray-800", "text-left", "pl-2", "mt-8", "mb-4"
  ], "Recipes");

  let toggleViewBtn = createElement("button", [
    "bg-red-700", "text-white", "font-medium", "px-4", "py-2", "rounded-md", "hover:bg-red-800"
  ], "View as List");

  let searchInput = createElement("input", [
    "border", "border-gray-400", "rounded-md", "px-3", "py-2", "w-full", "md:w-auto"
  ], "", {
    type: "text",
    placeholder: "Search meal type (e.g. snack, lunch)"
  });

  let searchBtn = createElement("button", [
    "bg-blue-700", "text-white", "font-medium", "px-4", "py-2", "rounded-md", "hover:bg-blue-800"
  ], "Search");

  let controlsRow = createElement("div", [
    "flex", "flex-col", "md:flex-row", "justify-between", "items-center", "gap-4", "mb-4"
  ]);
    let searchsRow = createElement("div", [
    "flex", "flex-col", "md:flex-row", "items-center", "gap-4", "mb-4"
  ]);
  appendToParent(searchsRow, [ searchInput, searchBtn]);

  appendToParent(controlsRow, [toggleViewBtn, searchsRow]);

  appendToParent(section, [title, controlsRow]);

  let cardsDiv = createElement("div", [
    "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "gap-6", "w-full", "p-2"
  ]);
  appendToParent(section, [cardsDiv]);

  let isGridView = true;
  toggleViewBtn.onclick = () => {
    isGridView = !isGridView;
    cardsDiv.className = isGridView
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-2"
      : "flex flex-col gap-4 w-full p-2";

    toggleViewBtn.textContent = isGridView ? "View as List" : "View as Grid";
  };

  let allRecipes = [];
  let shownCount = 0;

  let loadMoreBtn = createElement("button", [
    "bg-red-700", "text-white", "font-medium", "px-6", "py-3", "rounded-lg", "mt-6", "cursor-pointer", "mx-auto"
  ], "Load More..");

  loadMoreBtn.onclick = () => renderRecipes(allRecipes, false);
  appendToParent(section, [loadMoreBtn]);

  const renderRecipes = (recipes, reset = true) => {
    if (reset) {
      cardsDiv.innerHTML = "";
      shownCount = 0;
    }

    const nextBatch = recipes.slice(shownCount, shownCount + 12);
    nextBatch.forEach((recipe) => {
      let card = createCard(recipe);
      appendToParent(cardsDiv, [card]);
    });

    shownCount += nextBatch.length;

    loadMoreBtn.classList.toggle("hidden", shownCount >= recipes.length);
  };

  const fetchAll = () => {
    getRecipes((data) => {
      allRecipes = data.recipes || [];
      renderRecipes(allRecipes, true);
    });
  };

  searchBtn.onclick = () => {
    const mealType = searchInput.value.trim().toLowerCase();
    if (!mealType) {
      fetchAll();
    } else {
      getRecipesByMealType(mealType, (data) => {
        allRecipes = Array.isArray(data.recipes) ? data.recipes : [];
        renderRecipes(allRecipes, true);
      });
    }
  };

  fetchAll();

  return section;
};

appendToParent(app, [createNavbar(), createHeroSection(), createRecipesSection()]);
