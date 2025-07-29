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
    let navLinks = createElement("div", ['flex', 'gap-6','hidden','md:inline-flex','lg:inline-flex', 'text-lg']);
    let homeLink = createElement("a", ['text-gray-700','text-lg','font-medium', 'hover:text-red-700'], 'Home');
    homeLink.href = "#";
    let recipeLink = createElement("a", ['text-gray-700','text-lg','font-medium', 'hover:text-red-700'], 'Recipes');
    recipeLink.href = "#recipes";
    let aboutLink = createElement("a", ['text-gray-700','text-lg','font-medium', 'hover:text-red-700'], 'About');
    aboutLink.href = "#about";
    let contactLink = createElement("a", ['text-gray-700','text-lg','font-medium', 'hover:text-red-700'], 'Contact');
    contactLink.href = "#contact";

    let menuIcon = createElement("div", ['md:hidden','text-xl' ,'text-gray-700', 'cursor-pointer']);
    let menuIconContent = createElement("i", ['fas', 'fa-bars']);
    appendToParent(menuIcon, [menuIconContent]);
    let menu=createElement('div',['flex','flex-col','z-50','gap-2','absolute','top-17','right-6','bg-white','shadow-lg','rounded-lg','p-4','hidden','md:hidden','lg:hidden']);
    appendToParent(menu, [homeLink.cloneNode(true), recipeLink.cloneNode(true), aboutLink.cloneNode(true), contactLink.cloneNode(true)]);
    menuIcon.onclick = () => {
        menu.classList.toggle('hidden');
    };
   
    appendToParent(navLinks, [homeLink, recipeLink, aboutLink, contactLink]);
    appendToParent(navbar, [logo, navLinks,menuIcon,menu]);
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
    let showBtn = createElement("button", ['bg-red-700', 'text-white','font-medium', 'px-6', 'py-3', 'rounded-lg', 'mt-6'], 'Show Recipes');

    showBtn.onclick = () => {
        window.location.href = "#recipes";
    }

    appendToParent(contentWrapper, [heroTitle, heroSubtitle, showBtn]);
    appendToParent(heroSection, [transparentOverlay,contentWrapper]);
    return heroSection;
}

const createCard=(recipe)=>{
    // let containearDiv=createElement('div',['grid','grid-cols-1', 'md:grid-cols-2','lg:grid-cols-3', 'gap-6', 'w-full', 'p-2', 'mx-8'])
    let cardDiv=createElement('div',['flex', 'flex-col', 'bg-white', 'shadow-lg','hover:shadow-xl', 'rounded-lg', 'overflow-hidden'])
    let img=createElement('img',['hover:shadow-lg', 'h-[300px]','w-full','object-cover', 'rounded-t-lg'])
    img.src=recipe.image
    img.alt=recipe.name
    let contentDiv=createElement('div',['p-4','flex', 'flex-col', 'justify-between', 'h-full']);
    let nameRecipe=createElement('p',['text-lg' ,'font-semibold','text-gray-800'],recipe.name)
    let divIngredients=createElement('div',['pt-1','text-gray-900','px-4' ,'py-3' ,'w-full'])
    let p=createElement('p',['font-medium'],'Ingredients')
    let ul=createElement('ul',['list-disc' ,'pl-4', 'text-sm' ,'text-gray-700'])
    let ingredientLinks=recipe.ingredients.slice(0,4).map((ingredient)=>
        createElement('li',[],ingredient)
    )
    let btnShowDetails=createElement('button',['bg-red-700','text-white','font-medium','px-2','py-2','rounded-lg','mt-4','cursor-pointer'], 'Show Details')
    appendToParent(ul,ingredientLinks)
    appendToParent(divIngredients,[p,ul])
    appendToParent(contentDiv,[nameRecipe,divIngredients,btnShowDetails])
    appendToParent(cardDiv,[img,contentDiv])
    return cardDiv;
}