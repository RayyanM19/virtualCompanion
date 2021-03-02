class Food{
    constructor(){
        
        this.image = loadImage("Images/Milk.png");
        this.foodStock=0;
        this.lastFed;
        
    }

    getFoodStock(){
        return this.foodStock;

    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;

    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;

        }

    }

    display(foodStock){
        imageMode(CENTER);
        image(this.image,700,200,70,70);
        var x=80;
        var y=100;
        if(foodStock!==0){
            for(var i=0; i<foodStock; i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }


    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }


}