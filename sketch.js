var dog,sadDog,happyDog;
var foodButton,feedButton;
var database;
var foodObj, foodStock;
var fedTime;
var lastFed;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  database=firebase.database();

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  feedButton=createButton("Feed the Dog");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog);

  foodButton=createButton("Add Food");
  foodButton.position(800,95);
  foodButton.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  textSize(20);
  fill("white");
  if(lastFed>=12){
    text("Last Fed: "+lastFed%12+" PM",350,30);
  } else if(lastFed===0){
    text("Last Fed: 12AM",350,30);
  } else{
    text("Last Fed: "+lastFed+"AM",350,30);
  }
  drawSprites();

}

//function to read food Stock
function readStock(data){
  foods = data.val();
  foodObj.updateFoodStock(foods);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    feedTime: hour()
  })
}


//function to add food in stock
function addFoods(){
  foods++
  database.ref('/').update({
    food: foods
  })
}