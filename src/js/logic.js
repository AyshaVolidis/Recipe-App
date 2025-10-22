(function () {
  let addedRecipes = [];
  let fetchedRecipes = [];
  let allRecipes = [];
  let renderRecipesRef = null;

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

  const createHeroSection = () => {
    let heroSection = dom.createElement("section", [
      "py-32",
      "relative",
      "text-center",
      "bg-cover",
      "bg-no-repeat",
    ]);
    heroSection.style.backgroundImage = "url('src/public/images/foodbg.jpg')";
    heroSection.id = "home";
    let transparentOverlay = dom.createElement("div", [
      "absolute",
      "top-0",
      "left-0",
      "w-full",
      "h-full",
      "bg-black",
      "opacity-50",
      "z-0",
    ]);

    let contentWrapper = dom.createElement("div", [
      "relative",
      "z-40",
      "mx-auto",
    ]);

    let heroTitle = dom.createElement(
      "h1",
      ["text-4xl", "font-bold", "text-white"],
      "Welcome to Your Personal Recipe Book"
    );
    let heroSubtitle = dom.createElement(
      "p",
      ["text-lg", "text-white", "mt-4"],
      "Find new recipe ideas or add your own dishes and share your cooking magic."
    );
    let btns = dom.createElement("div", [
      "flex",
      "items-center",
      "justify-center",
      "gap-3",
    ]);
    let showBtn = dom.createElement(
      "button",
      [
        "bg-red-700",
        "border-3",
        "border-red-700",
        "text-white",
        "font-medium",
        "px-6",
        "py-3",
        "rounded-lg",
        "mt-6",
      ],
      "Show Recipes"
    );
    let addRecipe = dom.createElement(
      "button",
      [
        "border-3",
        "border-red-700",
        "text-white",
        "font-medium",
        "px-6",
        "py-3",
        "rounded-lg",
        "mt-6",
        "cursor-pointer",
      ],
      "Add Recipe"
    );
    showBtn.onclick = () => {
      window.location.href = "#recipes";
    };
    addRecipe.addEventListener("click", () => {
      let div = createAddRecipeModel();
      div.classList.remove("hidden");
      dom.appendToParent(app, [div]);
    });

    dom.appendToParent(btns, [showBtn, addRecipe]);
    dom.appendToParent(contentWrapper, [heroTitle, heroSubtitle, btns]);
    dom.appendToParent(heroSection, [transparentOverlay, contentWrapper]);
    return heroSection;
  };

  const createAddRecipeModel = () => {
    let BigDiv = dom.createElement("div", [
      "fixed",
      "inset-0",
      "flex",
      "items-center",
      "justify-center",
      "z-50",
      "hidden",
    ]);
    BigDiv.id = "AddRecipeModel";

    let layerDiv = dom.createElement("div", [
      "absolute",
      "inset-0",
      "bg-black/75",
      "z-40",
    ]);
    layerDiv.addEventListener("click", () => {
      BigDiv.classList.add("hidden");
    });

    let containearDiv = dom.createElement("div", [
      "relative",
      "z-50",
      "w-full",
      "bg-white",
      "rounded-lg",
      "shadow",
      "sm:max-w-md",
      "xl:p-0",
      "overflow-y-auto", "max-h-[90vh]"
    ]);

    let contentDiv = dom.createElement("div", [
      "p-6",
      "space-y-4",
      "md:space-y-6",
      "sm:p-8",
    ]);
    let title = dom.createElement(
      "p",
      [
        "text-xl",
        "font-bold",
        "leading-tight",
        "tracking-tight",
        "text-red-700",
        "md:text-2xl",
      ],
      "Add your Recipe!"
    );

    let form = dom.createElement("form", ["space-y-4", "md:space-y-6"]);
    let arrayInputs = ["Name", "Ingredients", "Instructions","Image", "MealType"];
    arrayInputs.forEach((input) => {
      dom.appendToParent(form, [createDivForm(input)]);
    });

    let btns = dom.createElement("div", ["flex", "items-start", "gap-3"]);
    let submitbtn = dom.createElement(
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
      "Add Recipe"
    );
    let cancelbtn = dom.createElement(
      "button",
      [
        "bg-gray-500",
        "text-white",
        "font-medium",
        "px-4",
        "py-2",
        "rounded-md",
        "hover:bg-gray-700",
      ],
      "Cancel"
    );
    cancelbtn.addEventListener("click", (e) => {
      e.preventDefault();
      BigDiv.classList.add("hidden");
    });
    dom.appendToParent(btns, [submitbtn, cancelbtn]);
    dom.appendToParent(form, [btns]);
    submitbtn.addEventListener("click", (e) => {
      let isVaild = true;
      e.preventDefault();
      document.querySelectorAll("form [name]").forEach((input) => {
        if (input.value.trim() == "") {
          isVaild = false;
          if (!input.nextElementSibling) {
            let p = dom.createElement(
              "p",
              ["text-red-500"],
              `${input.name} is required`
            );
            dom.appendToParent(input.parentElement, [p]);
          }
        }
      });

      if (isVaild) {
        let recipe = {};
        document.querySelectorAll("form [name]").forEach((input) => {
          if (input.name == "Ingredients" || input.name == "Instructions") {
            recipe[input.name.trim().toLowerCase()] = input.value
              .split("\n")
              .map((ingredient) => ingredient.trim())
              .filter((ingredient) => ingredient !== "");
          } else {
            recipe[input.name.trim().toLowerCase()] = input.value;
          }
        });
        recipe.id = Date.now();
        api.addRecipe(recipe, (data) => {
          let sucessMessage = dom.createSuccessMessage(
            "Recipe added successfully!"
          );
          dom.appendToParent(BigDiv, [sucessMessage]);
          addedRecipes.unshift(recipe);
          allRecipes = [...addedRecipes, ...fetchedRecipes];
          renderRecipesRef && renderRecipesRef(allRecipes, true);
          console.log(allRecipes);
        });
        setTimeout(() => {
          BigDiv.classList.add("hidden");
        }, 3000);
      }
    });

    dom.appendToParent(contentDiv, [title, form]);
    dom.appendToParent(containearDiv, [contentDiv]);
    dom.appendToParent(BigDiv, [layerDiv, containearDiv]);
    return BigDiv;
  };

  const createDivForm = (name) => {
    let div = dom.createElement("div");
    let label = dom.createElement(
      "label",
      ["block", "mb-1", "text-sm", "font-medium", "text-gray-900"],
      name
    );
    let input;
    if (name == "Ingredients" || name == "Instructions") {
      input = dom.createElement("textarea", [
        "bg-gray-50",
        "border",
        "border-gray-300",
        "text-gray-900",
        "rounded-lg",
        "focus:ring-blue-600",
        "focus:border-blue-600",
        "block",
        "w-full",
        "p-2.5",
      ]);
    } else {
      input = dom.createElement("input", [
        "bg-gray-50",
        "border",
        "border-gray-300",
        "text-gray-900",
        "rounded-lg",
        "focus:ring-blue-600",
        "focus:border-blue-600",
        "block",
        "w-full",
        "p-2.5",
      ]);
    }
    input.type = "text";
    input.name = name;
    input.addEventListener("input", () => {
      let errorMessage = input.nextElementSibling;
      if (errorMessage && errorMessage.tagName === "P") {
        errorMessage.remove();
      }
    });
    dom.appendToParent(div, [label, input]);
    return div;
  };

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
      window.scrollTo({ top: 0, behavior: "smooth" });
      dom.app.innerHTML = "";
      dom.appendToParent(dom.app, [dom.createNavbar()]);
      api.getRecipeDetails(recipe.id, (data) => {
        if (data.error) {
          data = allRecipes.find((rec) => rec.id == recipe.id);
        }
        let detailSection = createRecipeDetails(data);
        if (!document.getElementById("details-section")) {
          dom.appendToParent(dom.app, [detailSection, dom.createFooter()]);
        }
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
      ""
    );
    searchInput.type = "text";
    searchInput.placeholder = "Search by Meal Type";

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
    dom.appendToParent(searchsRow, [searchInput]);

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

    let LoadData = false;
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

    loadMoreBtn.onclick = () => renderRecipes(allRecipes, false);

    const renderRecipes = (recipes, reset = true) => {
      if (reset) {
        cardsDiv.innerHTML = "";
        shownCount = 0;
      }

      const nextBatch = recipes.slice(shownCount, shownCount + 12);
      nextBatch.forEach((recipe) => {
        LoadData = true;
        let card = createCard(recipe);
        dom.appendToParent(cardsDiv, [card]);
      });

      if (LoadData) {
        dom.appendToParent(section, [loadMoreBtn]);
        sippenarDiv.classList.add("hidden");
      }

      shownCount += nextBatch.length;

      loadMoreBtn.classList.toggle("hidden", shownCount >= recipes.length);
    };

    renderRecipesRef = renderRecipes;

    const fetchAll = () => {
      api.getRecipes((data) => {
        if (data.recipes && data.recipes.length > 0) {
          fetchedRecipes = data.recipes;
        }
        allRecipes=[...addedRecipes, ...fetchedRecipes];
        renderRecipes(allRecipes, true);
      });
    };

    const searchHandler = () => {
      const mealType = searchInput.value.trim().toLowerCase();
      sippenarDiv.classList.remove("hidden");
      if (!mealType) {
        fetchAll();
      } else {
        api.getRecipesByMealType(mealType, (data) => {
          fetchedRecipes = data.recipes || [];
          console.log(addedRecipes);
          let searchRecipes = addedRecipes.filter((recipe) =>recipe.mealtype?.trim().toLowerCase() === mealType);
          allRecipes = [...searchRecipes, ...fetchedRecipes];
          renderRecipes(allRecipes, true);
        });
      }
    };

    searchInput.addEventListener("input", searchHandler);

    fetchAll();

    return section;
  };

  const createRecipeDetails = (recipe) => {
    let section = dom.createElement("section", [
      "my-12",
      "mx-auto",
      "w-[85%]",
      "bg-white",
      "shadow-lg",
      "rounded-xl",
      "p-6",
    ]);
    section.id = "details-section";

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
    recipe.instructions?.forEach((step) => {
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
        createHeroSection(),
        dom.createAboutSection(),
        createRecipesSection(),
        dom.createFooter(),
      ]);
      document
        .getElementById("recipes")
        ?.scrollIntoView({ behavior: "smooth" });
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
    createHeroSection(),
    dom.createAboutSection(),
    createRecipesSection(),
    dom.createFooter(),
  ]);
})();
