(function () {
  window.addEventListener("scroll", function () {
    const existingButton = document.getElementById("scrollup");
    if (window.scrollY > 150) {
      if (!existingButton) {
        dom.appendToParent(dom.app, [dom.createScrollToTopButton()]);
      }
    } else {
      existingButton?.remove();
    }
  });

  const createCard = (recipe) => {
    let cardDiv = dom.createElement("div", [
      "flex",
      "flex-col",
      "bg-white",
      "shadow-lg",
      "hover:shadow-xl",
      "rounded-lg",
      "overflow-hidden",
    ]);
    let img = dom.createElement("img", [
      "hover:shadow-lg",
      "h-[300px]",
      "w-full",
      "object-cover",
      "rounded-t-lg",
    ]);
    img.src = recipe.image;
    img.alt = recipe.name;

    let contentDiv = dom.createElement("div", [
      "p-4",
      "flex",
      "flex-col",
      "justify-between",
      "h-full",
    ]);
    let nameRecipe = dom.createElement(
      "p",
      ["text-lg", "font-semibold", "text-gray-800"],
      recipe.name
    );

    let divIngredients = dom.createElement("div", [
      "pt-1",
      "text-gray-900",
      "px-4",
      "py-3",
      "w-full",
    ]);
    let p = dom.createElement("p", ["font-medium"], "Ingredients");
    let ul = dom.createElement("ul", [
      "list-disc",
      "pl-4",
      "text-sm",
      "text-gray-700",
    ]);
    let ingredientLinks = recipe.ingredients
      .slice(0, 4)
      .map((ingredient) => dom.createElement("li", [], ingredient));
    dom.appendToParent(ul, ingredientLinks);
    dom.appendToParent(divIngredients, [p, ul]);

    let btnShowDetails = dom.createElement(
      "button",
      [
        "bg-red-700",
        "text-white",
        "font-medium",
        "px-2",
        "py-2",
        "rounded-lg",
        "mt-4",
        "cursor-pointer",
      ],
      "Show Details"
    );

    btnShowDetails.addEventListener("click", () => {
      dom.app.innerHTML = "";
      dom.appendToParent(dom.app, [dom.createNavbar()]);
      api.getRecipeDetails(recipe.id, (data) => {
        let detailSection = createRecipeDetails(data);
        dom.appendToParent(dom.app, [detailSection, dom.createFooter()]);
      });
    });

    dom.appendToParent(contentDiv, [
      nameRecipe,
      divIngredients,
      btnShowDetails,
    ]);
    dom.appendToParent(cardDiv, [img, contentDiv]);

    return cardDiv;
  };

  const renderRecipes = (
    recipes,
    cardsDiv,
    loadMoreBtn,
    sippenarDiv,
    reset = true,
    shownCountObj
  ) => {
    if (reset) {
      cardsDiv.innerHTML = "";
      shownCountObj.value = 0;
    }

    const nextBatch = recipes.slice(
      shownCountObj.value,
      shownCountObj.value + 12
    );
    nextBatch.forEach((recipe) => {
      let card = createCard(recipe);
      dom.appendToParent(cardsDiv, [card]);
    });

    if (nextBatch.length) {
      dom.appendToParent(cardsDiv.parentElement, [loadMoreBtn]);
      sippenarDiv.classList.add("hidden");
    }

    shownCountObj.value += nextBatch.length;
    loadMoreBtn.classList.toggle(
      "hidden",
      shownCountObj.value >= recipes.length
    );
  };

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
    let shownCountObj = { value: 0 };

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
    loadMoreBtn.onclick = () =>
      renderRecipes(
        allRecipes,
        cardsDiv,
        loadMoreBtn,
        sippenarDiv,
        false,
        shownCountObj
      );

    let sippenarDiv = dom.createElement("div", [
      "flex",
      "items-center",
      "justify-center",
      "mt-2",
      "mx-auto",
      "w-full",
      "bg-white",
      "z-50",
    ]);
    dom.appendToParent(section, [sippenarDiv]);
    dom.appendToParent(sippenarDiv, [dom.createSpinnear()]);

    const fetchAll = () => {
      api.getRecipes((data) => {
        allRecipes = data.recipes || [];
        renderRecipes(
          allRecipes,
          cardsDiv,
          loadMoreBtn,
          sippenarDiv,
          true,
          shownCountObj
        );
      });
    };

    const searchHandler = () => {
      const mealType = searchInput.value.trim().toLowerCase();
      if (!mealType) {
        fetchAll();
      } else {
        api.getRecipesByMealType(mealType, (data) => {
          allRecipes = Array.isArray(data.recipes) ? data.recipes : [];
          renderRecipes(
            allRecipes,
            cardsDiv,
            loadMoreBtn,
            sippenarDiv,
            true,
            shownCountObj
          );
        });
      }
    };

    searchInput.addEventListener("input", searchHandler);
    searchBtn.onclick = searchHandler;

    fetchAll();
    return section;
  };

  const createRecipeDetails = (recipe) => {
    let section = dom.createElement("section", ["my-8", "mx-auto", "w-[80%]"]);

    let wrapper = dom.createElement("div", [
      "flex",
      "flex-col",
      "lg:flex-row",
      "gap-6",
    ]);

    let image = dom.createElement("img", ["w-full", "lg:w-1/2", "rounded-lg"]);
    image.src = recipe.image;

    let info = dom.createElement("div", ["flex-1"]);

    let title = dom.createElement(
      "h1",
      ["text-3xl", "font-bold", "text-red-800", "mb-4"],
      recipe.name
    );

    let ingredientsTitle = dom.createElement(
      "h2",
      ["text-2xl", "font-semibold", "mt-4", "mb-2"],
      "Ingredients:"
    );
    let ingredientsList = dom.createElement("ul", ["list-disc", "pl-6"]);
    recipe.ingredients.forEach((ing) => {
      let li = dom.createElement("li", ["text-gray-700"], ing);
      dom.appendToParent(ingredientsList, [li]);
    });

    let instructionsTitle = dom.createElement(
      "h2",
      ["text-2xl", "font-semibold", "mt-6", "mb-2"],
      "Instructions:"
    );
    let instructionsList = dom.createElement("ol", ["list-decimal", "pl-6"]);
    recipe.instructions.forEach((step) => {
      let li = dom.createElement("li", ["text-gray-700", "mb-1"], step);
      dom.appendToParent(instructionsList, [li]);
    });

    let goBackBtn = dom.createElement(
      "button",
      [
        "bg-red-700",
        "text-white",
        "font-medium",
        "px-4",
        "py-2",
        "rounded-md",
        "hover:bg-red-800",
        "mt-6",
      ],
      "Go Back"
    );

    goBackBtn.onclick = () => {
      dom.app.innerHTML = "";
      dom.appendToParent(dom.app, [
        dom.createNavbar(),
        dom.createHeroSection(),
        dom.createAboutSection(),
        createRecipesSection(),
        dom.createFooter(),
      ]);
      window.location.href= "#recipes";
    };

    dom.appendToParent(info, [
      title,
      ingredientsTitle,
      ingredientsList,
      instructionsTitle,
      instructionsList,
      goBackBtn,
    ]);

    dom.appendToParent(wrapper, [image, info]);
    dom.appendToParent(section, [wrapper]);

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
