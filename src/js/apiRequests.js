let api=(function() {
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

  const addRecipe= (recipe, callback) => {
    let xhr=new XMLHttpRequest()
    xhr.onreadystatechange=()=>{
      if(xhr.readyState===4&&xhr.status==200){
        let data=JSON.parse(xhr.responseText)
        callback(data)
      }
    }
    xhr.open('POST','https://dummyjson.com/recipes/add')
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(recipe))
  }
const getRecipeDetails = (id, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      callback(data);
    }
    else{
      callback({ error: "Recipe not found" });
    }
  };
  xhr.open("GET", `https://dummyjson.com/recipes/${id}`);
  xhr.send();
};

  return {
    getRecipes,
    getRecipesByMealType,
    addRecipe,
    getRecipeDetails
  };
})();