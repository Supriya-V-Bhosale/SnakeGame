let inputDir={x:0,y:0}

let lastPainTime=0;
let speed=5;
let score=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6,y:7}


function main(ctime){
    window.requestAnimationFrame(main);
    
    // console.log(ctime);
    if((ctime-lastPainTime)/1000 < 1/speed){
        return;
    }
    lastPainTime=ctime;
    gameEngine();
}

    function isCollide(snake){
        //ifyou bump into yourself
        for(let index=1;index<snakeArr.length;index++){
            if(snake[index].x===snake[0].x && snake[index].y===snake[0].y  ){
                return true;
            }
        }
        //if you bumb to the wall
            if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
                return true;
            }
        

    }
    function gameEngine(){
        //part 1:Updating the snake array & food
        if(isCollide(snakeArr)){
            inputDir={x:0,y:0};
            alert("Game over! Press any key to play again!")
            snakeArr =[{x:13,y:15}]
            score=0;
        }
        //If you  have eaten the food , increment the score and regenerate the food
        if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
            score+=1;
            scoreBox.innerHTML="Score:" + score;
            snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
            let a=2;
            let b=16;

            food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}

        }
        //moving the snake
        for(let i=snakeArr.length-2;i>=0;i--){
            snakeArr[i+1]={...snakeArr[i]};

        }
        snakeArr[0].x +=inputDir.x;
        snakeArr[0].y +=inputDir.y;
        

        //part 2:Display the snake and food
        board.innerHTML="";
        snakeArr.forEach((e,index)=>{
            snakeElement=document.createElement('div');
            snakeElement.style.gridRowStart=e.y;
            snakeElement.style.gridColumnStart=e.x;
            if(index===0){
                snakeElement.classList.add('head');

            }
            else{
                snakeElement.classList.add('snake');

            }

            board.appendChild(snakeElement);

        });
            foodElement=document.createElement('div');
            foodElement.style.gridRowStart=food.y;
            foodElement.style.gridColumnStart=food.x;
            foodElement.classList.add('food');
            board.appendChild(foodElement);

    }

//main logic start here


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y=-1 ;
            break;

        case "ArrowDown":
            console.log("ArrowUDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowLeft":
            console.log("ArrowULeft");
            inputDir.x=-1;
            inputDir.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1 ;
            inputDir.y= 0;
            break;
        default:
            break;
       
       
    }
})