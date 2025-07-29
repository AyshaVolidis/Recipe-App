(function () {
  window.addEventListener('scroll', function () {
      const existingButton = document.getElementById("scrollup");

      if (window.scrollY > 150) {
        if (!existingButton) {
          dom.appendToParent(dom.app, [dom.createScrollToTopButton()]);
        }
      } else {
        existingButton?.remove();
      }
  });

  const createRecipesSection = () => {
    let section = dom.createElement("section", ["my-3", "mx-auto", "w-[80%]"]);
    section.id = "recipes";

    let title = dom.createElement(
      "h1",
      [
        "text-3xl",
        "font-bold",
        "text-red-800",
        "text-center",
        "pl-2",
        "mt-8",
        "mb-4",
      ],
      "Recipes"
    );

    let toggleViewBtn = dom.createElement(
      "button",
      [
        "bg-red-700",
        "text-white",
        "font-medium",
        "px-4",
        "py-2",
        "rounded-md",
        "hover:bg-red-800",
      ],
      "View as List"
    );

    let searchInput = dom.createElement(
      "input",
      [
        "border",
        "border-gray-400",
        "rounded-md",
        "px-3",
        "py-2",
        "w-full",
        "md:w-auto",
      ],
      "",
      {
        type: "text",
        placeholder: "Search meal type (e.g. snack, lunch)",
      }
    );

    let searchBtn = dom.createElement(
      "button",
      [
        "bg-red-700",
        "text-white",
        "font-medium",
        "px-4",
        "py-2",
        "rounded-md",
        "hover:bg-red-600",
      ],
      "Search"
    );

    let controlsRow = dom.createElement("div", [
      "flex",
      "flex-col",
      "md:flex-row",
      "justify-between",
      "items-center",
      "gap-4",
      "mb-4",
    ]);
    let searchsRow = dom.createElement("div", [
      "flex",
      "flex-col",
      "md:flex-row",
      "items-center",
      "gap-4",
      "mb-4",
    ]);
    dom.appendToParent(searchsRow, [searchInput, searchBtn]);

    dom.appendToParent(controlsRow, [toggleViewBtn, searchsRow]);

    dom.appendToParent(section, [title, controlsRow]);

    let cardsDiv = dom.createElement("div", [
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "gap-6",
      "w-full",
      "p-2",
    ]);
    dom.appendToParent(section, [cardsDiv]);

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

    let loadMoreBtn = dom.createElement(
      "button",
      [
        "bg-red-700",
        "text-white",
        "font-medium",
        "px-6",
        "py-3",
        "rounded-lg",
        "mt-6",
        "cursor-pointer",
        "mx-auto",
      ],
      "Load More.."
    );

    let LoadData=false;
    let sippenarDiv=dom.createElement("div",["flex","items-center","justify-center","mt-2","mx-auto","w-full","bg-white","z-50"]);
    dom.appendToParent(section, [sippenarDiv]);
    dom.appendToParent(sippenarDiv, [dom.createSpinnear()]);

    loadMoreBtn.onclick = () => renderRecipes(allRecipes, false);
    

    const renderRecipes = (recipes, reset = true) => {
      if (reset) {
        cardsDiv.innerHTML = "";
        shownCount = 0;
      }

      const nextBatch = recipes.slice(shownCount, shownCount + 12);
      nextBatch.forEach((recipe) => {
        LoadData=true;
        let card = dom.createCard(recipe);
        dom.appendToParent(cardsDiv, [card]);
      });

      if (LoadData) {
        dom.appendToParent(section, [loadMoreBtn]);
        sippenarDiv.classList.add("hidden");
      }

      shownCount += nextBatch.length;

      loadMoreBtn.classList.toggle("hidden", shownCount >= recipes.length);
    };

 
    const fetchAll = () => {
      api.getRecipes((data) => {
        allRecipes = data.recipes || [];
        renderRecipes(allRecipes, true);
      });
    };

    searchBtn.onclick = () => {
      const mealType = searchInput.value.trim().toLowerCase();
      if (!mealType) {
        fetchAll();
      } else {
        api.getRecipesByMealType(mealType, (data) => {
          allRecipes = Array.isArray(data.recipes) ? data.recipes : [];
          renderRecipes(allRecipes, true);
        });
      }
    };

    fetchAll();

    return section;
  };

  dom.appendToParent(dom.app, [
    dom.createNavbar(),
    dom.createHeroSection(),
    dom.createAboutSection(),
    createRecipesSection(),
    dom.createFooter(),
  ]);
})();
