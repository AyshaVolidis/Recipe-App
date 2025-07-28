let app=document.getElementById("app");

const getRecipes = (callback)=>{
    let xhr=new XMLHttpRequest()
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4&&xhr.status==200){
            let data=JSON.parse(xhr.responseText)
            callback(data)
        }
    }
    xhr.open('Get','https://dummyjson.com/recipes')
    xhr.send()
}


const  createRecipesSection=()=>{
    let section=createElement('section',['my-3','mx-4'])
    section.id='recipes';
    let title=createElement('h1',['text-3xl','font-medium','text-gray-800','text-left','pl-2','mt-8','mb-4'],'Recipes')
    let cardsDiv=createElement('div',['grid','grid-cols-1', 'md:grid-cols-2','lg:grid-cols-3', 'gap-6', 'w-full', 'p-2'])
    appendToParent(section,[title,cardsDiv])
    let allRecipes=[]
    getRecipes((data)=>{
        allRecipes=data.recipes;
        allRecipes.slice(0,12).forEach(recipe=>{
            let card=createCard(recipe)
            appendToParent(cardsDiv,[card])
        })

        let loadMoreBtn=createElement('button',['bg-red-700','text-white','font-medium','px-6','py-3','rounded-lg','mt-6','cursor-pointer'], 'Load More..')
        loadMoreBtn.onclick=()=>{
            allRecipes.slice(12).forEach(recipe=>{
                let card=createCard(recipe)
                appendToParent(cardsDiv,[card])
            })
            loadMoreBtn.classList.add('hidden')
        }
        appendToParent(section,[loadMoreBtn])
    })
        
    
    return section;
}


appendToParent(app,[createNavbar(),createHeroSection(),createRecipesSection()]);
