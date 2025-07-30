const dom = (function () {
  let app = document.getElementById("app");

  const createElement = (tag, classes = [], text = "") => {
    let element = document.createElement(tag);
    classes.forEach((clas) => {
      element.classList.add(clas);
    });
    element.textContent = text;
    return element;
  };

  const appendToParent = (parent, children = []) => {
    children.forEach((child) => {
      parent.appendChild(child);
    });
  };

  const createNavbar = () => {
    let navbar = createElement("nav", [
      "bg-white",
      "py-4",
      "w-full",
      "flex",
      "justify-between",
      "items-center",
      "px-6",
    ]);
    let logo = createElement(
      "div",
      ["text-2xl", "font-medium", "text-red-700"],
      "RecipeApp"
    );
    let navLinks = createElement("div", [
      "flex",
      "gap-6",
      "hidden",
      "md:inline-flex",
      "lg:inline-flex",
      "text-lg",
    ]);
    let homeLink = createElement(
      "a",
      ["text-gray-700", "text-lg", "font-medium", "hover:text-red-700"],
      "Home"
    );
    homeLink.href = "#";
    let recipeLink = createElement(
      "a",
      ["text-gray-700", "text-lg", "font-medium", "hover:text-red-700"],
      "Recipes"
    );
    recipeLink.href = "#recipes";
    let aboutLink = createElement(
      "a",
      ["text-gray-700", "text-lg", "font-medium", "hover:text-red-700"],
      "About"
    );
    aboutLink.href = "#about";
    let contactLink = createElement(
      "a",
      ["text-gray-700", "text-lg", "font-medium", "hover:text-red-700"],
      "Contact"
    );
    contactLink.href = "#contact";

    let menuIcon = createElement("div", [
      "md:hidden",
      "text-xl",
      "text-gray-700",
      "cursor-pointer",
    ]);
    let menuIconContent = createElement("i", ["fas", "fa-bars"]);
    appendToParent(menuIcon, [menuIconContent]);
    let menu = createElement("div", [
      "flex",
      "flex-col",
      "w-full",
      "z-50",
      "gap-2",
      "absolute",
      "top-17",
      "right-0",
      "left-0",
      "bg-white",
      "shadow-lg",
      "rounded-lg",
      "p-4",
      "hidden",
      "md:hidden",
      "lg:hidden",
    ]);
    appendToParent(menu, [
      homeLink.cloneNode(true),
      aboutLink.cloneNode(true),
      recipeLink.cloneNode(true),
      contactLink.cloneNode(true),
    ]);
    menuIcon.onclick = () => {
      menu.classList.toggle("hidden");
    };

    appendToParent(navLinks, [homeLink, aboutLink, recipeLink, contactLink]);
    appendToParent(navbar, [logo, navLinks, menuIcon, menu]);
    return navbar;
  };

  const createHeroSection = () => {
    let heroSection = createElement("section", [
      "py-32",
      "relative",
      "text-center",
      "bg-cover",
      "bg-no-repeat",
    ]);
    heroSection.style.backgroundImage = "url('/src/public/images/foodbg.jpg')";
    heroSection.id = "home";
    let transparentOverlay = createElement("div", [
      "absolute",
      "top-0",
      "left-0",
      "w-full",
      "h-full",
      "bg-black",
      "opacity-50",
      "z-0",
    ]);

    let contentWrapper = createElement("div", ["relative", "z-40", "mx-auto"]);

    let heroTitle = createElement(
      "h1",
      ["text-4xl", "font-bold", "text-white"],
      "Welcome to Your Personal Recipe Book"
    );
    let heroSubtitle = createElement(
      "p",
      ["text-lg", "text-white", "mt-4"],
      "Find new recipe ideas or add your own dishes and share your cooking magic."
    );
    let btns = createElement("div", [
      "flex",
      "items-center",
      "justify-center",
      "gap-3",
    ]);
    let showBtn = createElement(
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
    let addRecipe = createElement(
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
      let div = createAddRecipe();
      console.log(div);
      div.classList.remove("hidden");
      appendToParent(app, [div]);
    });

    appendToParent(btns, [showBtn, addRecipe]);
    appendToParent(contentWrapper, [heroTitle, heroSubtitle, btns]);
    appendToParent(heroSection, [transparentOverlay, contentWrapper]);
    return heroSection;
  };

  const createAboutSection = () => {
    let section = createElement("section", ["bg-white", "py-10", "px-6"]);
    section.id = "about";
    let contentDiv = createElement("div", ["mx-auto", "text-center"]);
    let title = createElement(
      "h2",
      ["text-3xl", "font-bold", "mb-6", "text-red-700"],
      "About Us"
    );
    let description = createElement(
      "p",
      ["text-gray-700", "text-lg", "leading-relaxed"],
      "Welcome to our Recipe App! We created this project to help food enthusiasts discover and share delicious recipes from around the world. Whether you are a seasoned chef or a beginner in the kitchen, our app provides a platform for you to explore, save, and contribute your favorite recipes."
    );
    appendToParent(contentDiv, [title, description]);
    let containearImages = createElement("div", ["mt-8", "overflow-hidden"]);
    let innerDiv = createElement("div", [
      "flex",
      "animate-scroll",
      "gap-6",
      "w-max",
    ]);
    let images = [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=481&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=449&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=415&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg",
      "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/M6HASPARCZHYNN4XTUYT7H6PTE.jpg&w=800&h=600",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=481&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=449&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=415&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg",
      "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/M6HASPARCZHYNN4XTUYT7H6PTE.jpg&w=800&h=600",
    ];
    images.forEach((image) => {
      let img = createElement("img", [
        "w-48",
        "h-48",
        "object-cover",
        "rounded-lg",
        "shadow-lg",
      ]);
      img.src = image;
      appendToParent(innerDiv, [img]);
    });
    appendToParent(containearImages, [innerDiv]);
    appendToParent(section, [contentDiv, containearImages]);
    return section;
  };

  const createLinkwithIcon = (iconClass, text, size) => {
    let link = createElement("a", [
      "flex",
      "items-center",
      `text-${size}`,
      "text-white",
      "hover:text-red-700",
    ]);
    let icon = createElement("i", iconClass);
    icon.classList.add("mr-2");
    let linkText = createElement("span", [], text);
    appendToParent(link, [icon, linkText]);
    return link;
  };

  const createFooter = () => {
    let footer = createElement("footer", [
      "bg-gray-800",
      "text-white",
      "py-10",
      "text-center",
    ]);
    footer.id = "contact";
    let footerContent = createElement("div", [
      "max-w-6xl",
      "mx-auto",
      "px-4",
      "grid",
      "grid-cols-1",
      "md:grid-cols-3",
      "gap-8",
    ]);
    let aboutSection = createElement("div");
    let aboutTitle = createElement(
      "h3",
      ["text-xl", "font-bold", "mb-2"],
      "RecipeApp"
    );
    let aboutText = createElement(
      "p",
      ["text-sm"],
      "A simple and dynamic recipe web app to discover and manage delicious dishes."
    );
    appendToParent(aboutSection, [aboutTitle, aboutText]);

    let contactSection = createElement("div", [
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
    ]);
    let contactTitle = createElement(
      "h3",
      ["text-xl", "font-bold", "mb-2"],
      "Contact Us"
    );
    let contactList = createElement("ul", ["space-y-2", "text-sm"]);
    appendToParent(contactList, [
      createLinkwithIcon(
        ["fa-solid", "fa-envelope"],
        "ayshavolidis@gmail.com",
        "lg"
      ),
      createLinkwithIcon(["fa-solid", "fa-phone"], "+970 599 999 999", "lg"),
      createLinkwithIcon(
        ["fa-solid", "fa-location-dot"],
        "Palestine,Gaza",
        "lg"
      ),
    ]);
    appendToParent(contactSection, [contactTitle, contactList]);

    let followSection = createElement("div");
    let followTitle = createElement(
      "h3",
      ["text-xl", "font-bold", "mb-2"],
      "Follow Us"
    );
    let followList = createElement("div", [
      "flex",
      "gap-3",
      "text-lg",
      "justify-center",
      "items-center",
    ]);
    appendToParent(followList, [
      createLinkwithIcon(["fa-brands", "fa-facebook"], "", "2xl"),
      createLinkwithIcon(["fa-brands", "fa-instagram"], "", "2xl"),
      createLinkwithIcon(["fa-brands", "fa-github"], "", "2xl"),
    ]);
    appendToParent(followSection, [followTitle, followList]);
    appendToParent(footerContent, [
      aboutSection,
      contactSection,
      followSection,
    ]);
    let copyright = createElement(
      "p",
      ["text-sm", "mt-6"],
      "© 2023 RecipeApp. All rights reserved."
    );
    appendToParent(footer, [footerContent, copyright]);
    return footer;
  };

  const createAddRecipe = () => {
    let BigDiv = createElement("div", [
      "fixed",
      "inset-0",
      "flex",
      "items-center",
      "justify-center",
      "z-50",
      "hidden",
    ]);
    BigDiv.id = "AddRecipeModel";

    let layerDiv = createElement("div", [
      "absolute",
      "inset-0",
      "bg-black/75",
      "z-40",
    ]);
    layerDiv.addEventListener("click", () => {
      BigDiv.classList.add("hidden");
    });

    let containearDiv = createElement("div", [
      "relative",
      "z-50",
      "w-full",
      "bg-white",
      "rounded-lg",
      "shadow",
      "sm:max-w-md",
      "xl:p-0",
    ]);

    let contentDiv = createElement("div", [
      "p-6",
      "space-y-4",
      "md:space-y-6",
      "sm:p-8",
    ]);
    let title = createElement(
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

    let form = createElement("form", ["space-y-4", "md:space-y-6"]);
    let arrayInputs = ["Name", "Ingredients", "ImageUrl", "MealType"];
    arrayInputs.forEach((input) => {
      appendToParent(form, [createDivForm(input)]);
    });

    let submitbtn = createElement(
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
    appendToParent(form, [submitbtn]);
    submitbtn.addEventListener("click", (e) => {
      let isVaild = true;
      e.preventDefault();
      document.querySelectorAll("form [name]").forEach((input) => {
        if (input.value.trim() == "") {
          isVaild = false;
          if (!input.nextElementSibling) {
            let p = createElement(
              "p",
              ["text-red-500"],
              `${input.name} is required`
            );
            appendToParent(input.parentElement, [p]);
          }
        }
      });

      if (isVaild) {
        let recipe = {};
        document.querySelectorAll("form [name]").forEach((input) => {
          recipe[input.name] = input.value;
        });
        api.addRecipe(recipe, (data) => {
          console.log(data);
          let sucessMessage = createSuccessMessage(
            "Recipe added successfully!"
          );
          appendToParent(BigDiv, [sucessMessage]);
        });
        setTimeout(() => {
          BigDiv.classList.add("hidden");
        }, 3000);
      }
    });

    appendToParent(contentDiv, [title, form]);
    appendToParent(containearDiv, [contentDiv]);
    appendToParent(BigDiv, [layerDiv, containearDiv]);
    return BigDiv;
  };

  const createDivForm = (name) => {
    let div = createElement("div");
    let label = createElement(
      "label",
      ["block", "mb-1", "text-sm", "font-medium", "text-gray-900"],
      name
    );
    let input;
    if (name == "Ingredients" || name == "Instructions") {
      input = createElement("textarea", [
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
      input = createElement("input", [
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
    appendToParent(div, [label, input]);
    return div;
  };

  const createSuccessMessage = (message) => {
    let successDiv = createElement("div", [
      "p-4",
      "absolute",
      "z-50",
      "top-14",
      "mb-4",
      "text-sm",
      "text-white",
      "rounded-lg",
      "bg-green-800",
    ]);
    successDiv.setAttribute("role", "alert");
    let strongText = createElement("span", ["font-medium"], message);
    appendToParent(successDiv, [strongText]);
    return successDiv;
  };

  const createSpinnear = () => {
    let spinnerDiv = createElement("div", [
      "flex",
      "items-center",
      "justify-center",
      "mx-auto",
      "w-full",
      "bg-white",
      "z-50",
    ]);
    spinnerDiv.setAttribute("role", "status");
    spinnerDiv.innerHTML = `
     <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    `;
    return spinnerDiv;
  };

  const createScrollToTopButton = () => {
    let div = createElement("div");
    let a = createElement(
      "a",
      [
        "w-12",
        "h-12",
        "fixed",
        "bottom-16",
        "rounded-full",
        "right-10",
        "z-50",
        "text-center",
        "transition-all",
        "ease-linear",
        "duration-300",
        "bg-red-700",
        "hover:text-white",
        "text-white",
        "text-xl",
        "leading-loose",
        "font-bold",
      ],
      ""
    );
    a.href = "#";
    a.id = "scrollup";
    let i = createElement("i", ["fa-solid", "fa-up-long"]);
    appendToParent(a, [i]);
    appendToParent(div, [a]);
    a.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      a.classList.add("hidden");
    });
    return div;
  };

 

  return {
    app,
    createElement,
    appendToParent,
    createNavbar,
    createHeroSection,
    createSpinnear,
    createScrollToTopButton,
    createAboutSection,
    createFooter,
  };
})();
