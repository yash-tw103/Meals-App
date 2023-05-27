
const movie = document.querySelector(".movie");

//deleting function
const deletevalue=(value)=>{
    let meals=[];
    JSON.parse(localStorage.getItem('meals')).map(data=>{
        if(data.title != value){
            meals.push(data);
        }
    });
    localStorage.setItem('meals' , JSON.stringify(meals));

    window.location.reload();
    e.preventDefault();
};


//fetching function
async function getmeals(){
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s';


try {
	const response = await fetch(url);
	const result = await response.json();
    const meals = result.meals;
    console.log(meals);

    meals.map((item)=>{
        
        const image = item.strMealThumb;
        const title= item.strMeal;
        // const description= item.strInstructions;
        const strtarea = item.strArea;
        
        const tutorial = item.strYoutube;
        const tags = item.strTags;
        

        const changediv = `
        <div class="card p-2 mx-auto my-4" style="width: 25rem; background-color: #DD7230; color: white; border:1px solid pink;">
  <a href="#"><img src="${image}" class="card-img-top" alt="..."></a>
  <div class="card-body">
    <h5 class="card-title"><center><span><button type="button" class="btn btn-warning"><img src="${image}" style="width: 30px; height: 20px;"> ${title}</span></button></center></h5>
    <p class="card-text"><span><i class="fa-solid fa-location-dot" style="color: #cc2424;"></i> ${strtarea}</span></p>
    <p><span style="border: 1px solid white; padding :2px"></i> ${tags}</span></p>
    
    
    
    
    <p><button class="btn btn-primary addtocart">Add to Favourites</button></p>
  </div>
</div>
        `

        movie.innerHTML += changediv;




        
        

 //Saving the data fetched as favourites when button is clicked in local storage
        
let meals = []
let addtocart = document.getElementsByClassName("addtocart");

for(let i=0 ; i<addtocart.length ; i++){
    addtocart[i].addEventListener("click",function(e){
        console.log(i+1, e.target.parentElement.parentElement.children);
        if(typeof(Storage) !== 'undefined'){
            let item = {
                id : i+1,
                title : e.target.parentElement.parentElement.children[0].textContent,
                strtarea : e.target.parentElement.parentElement.children[1].children[0].textContent,
                
                img : e.target.parentElement.parentElement.parentElement.children[0].children[0].src,
                no : 1
            }
            if(JSON.parse(localStorage.getItem('meals')) === null){
                meals.push(item);
                localStorage.setItem("meals" ,JSON.stringify(meals) );
                window.location.reload();
                e.preventDefault()
            }else{
                const localmeals = JSON.parse(localStorage.getItem("meals"));

                localmeals.map((data)=>{
                    if(item.id == data.id){
                        item.no = data.no +1;
                    }else{
                        meals.push(data);
                    }
                });
                meals.push(item);
                localStorage.setItem('meals',JSON.stringify(meals));
                window.location.reload();
                e.preventDefault();
            }
        }else{
            alert("Local Storage Is Not Working on Your Browser");
        }

    })

    let contentcontainer = document.getElementById("content");
    let contentdiv = ``;

    if(JSON.parse(localStorage.getItem('meals'))=== null){
     contentdiv += `<center class="mx-auto"> No Favourites Found </center>
     `   
    }else{
        JSON.parse(localStorage.getItem('meals')).map(data=>{
            contentdiv += `
            <div class="card  mx-auto my-4" style="width: 18rem; background-color: #DD7230; border:1px solid pink;  color: white; padding-left:0">
            <img src="${data.img}" class="card-img-top" alt="..." style="border: 1px solid pink;">
  <div class="card-body">
    <h5 class="card-title"><center><span><button type="button" class="btn btn-warning"><img src="${data.img}" style="width: 30px; height: 20px;"> ${data.title}</span></button></center></h5>
    <p class="card-text"><span><i class="fa-solid fa-location-dot" style="color: #cc2424;"></i> ${data.strtarea}</span></p>
    
    
    <button target="blank" class="btn btn-primary addtocart" onClick="deletevalue('${data.title}')">Remove From Favourites</button>
  </div>
</div>
            
            `
        })

    }

    contentcontainer.innerHTML = contentdiv;

}




    })


    // Add event listeners to the card elements
    const linkElements = document.querySelectorAll(".card-img-top");
    linkElements.forEach((link, index) => {
      link.addEventListener("click", () => {
        const selectedMeal = meals[index];
        localStorage.setItem("selectedMeal", JSON.stringify(selectedMeal));
        window.open("show.html" , "_blank");
      });
    });
} catch (error) {
	console.error(error);
}
}
getmeals();


//search filter
const searchFun3 = ()=>{
    const filter = document.getElementById('user').value.toUpperCase();
  
    const cards = document.getElementsByClassName("card");
  
    for(let i=0; i<cards.length ; i++){
        let divd = cards[i].getElementsByTagName('h5')[0];
        if(divd){
            let textvalue = divd.textContent || divd.innerHTML;
  
            if(textvalue.toUpperCase().indexOf(filter) >-1){
                cards[i].style.display="";
            }else{
                cards[i].style.display="none";
            }
    }
  }
  }


  //function sidebar


  function openNav() {
      document.getElementById("mySidenav").style.width = "700px";
    }
    
    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    }
  