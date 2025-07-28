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
    let navbar = createElement("nav", ['bg-white','py-4', 'w-full', 'flex', 'justify-between', 'items-center', 'px-6']);
    let logo = createElement("div", ['text-2xl', 'font-medium','text-red-700'], 'RecipeApp');
    let navLinks = createElement("div", ['flex', 'gap-6', 'text-lg']);
    let homeLink = createElement("a", ['text-gray-700','text-lg','font-medium', 'hover:text-red-700'], 'Home');
    homeLink.href = "#";
    let recipeLink = createElement("a", ['text-gray-700','text-lg','font-medium', 'hover:text-red-700'], 'Recipes');
    recipeLink.href = "#ٌrecipes";
    let aboutLink = createElement("a", ['text-gray-700','text-lg','font-medium', 'hover:text-red-700'], 'About');
    aboutLink.href = "#about";
    let contactLink = createElement("a", ['text-gray-700','text-lg','font-medium', 'hover:text-red-700'], 'Contact');
    contactLink.href = "#contact";
   
    appendToParent(navLinks, [homeLink, recipeLink, aboutLink, contactLink]);
    appendToParent(navbar, [logo, navLinks]);
    return navbar;
}


const createHeroSection = () => {
    let heroSection = createElement("section", [
        'py-32', 'relative', 'text-center', 'bg-cover', 'bg-no-repeat'
    ]);
    heroSection.style.backgroundImage = "url('/src/public/images/foodbg.jpg')";

    let transparentOverlay = createElement("div", [
        'absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'bg-black', 'opacity-30', 'z-0'
    ]);

    let contentWrapper = createElement("div", ['relative','z-50','mx-auto']);

    let heroTitle = createElement("h1", ['text-4xl', 'font-bold', 'text-white'], 'Welcome to Your Personal Recipe Book');
    let heroSubtitle = createElement("p", ['text-lg', 'text-white', 'mt-4'], 'Find new recipe ideas or add your own dishes and share your cooking magic.');
    let shopNowBtn = createElement("button", ['bg-red-700', 'text-white','font-medium', 'px-6', 'py-3', 'rounded-lg', 'mt-6'], 'Show Recipes');

    shopNowBtn.onclick = () => {
        window.location.href = "#recipes";
    }

    appendToParent(contentWrapper, [heroTitle, heroSubtitle, shopNowBtn]);
    appendToParent(heroSection, [transparentOverlay,contentWrapper]);
    return heroSection;
}