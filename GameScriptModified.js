let firstTable=document.querySelector("table");
let arrayOfImages=["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg","images/6.jpg","images/7.jpg","images/8.jpg",
                   "images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg","images/6.jpg","images/7.jpg","images/8.jpg"];


let twoDArray=[[],[],[],[]];

//spread the images on two D array randamly by the index of the arrrayOfImages

//let checkArray=[];
/*for(let i=0 ;i<twoDArray.length;i++){
    twoDArray[i]=new Array(4);
    for(let j=0;j<twoDArray.length;j++){
     /* var randomIndex=Math.floor(Math.random()*16);
      if(!checkArray.includes(randomIndex)){
          twoDArray[i][j]=arrayOfImages[randomIndex];
          checkArray.push(randomIndex);
      }*/
   // }   
//}

//spread the images on two D array randamly by the location of the two D array
for(let i=0;i<arrayOfImages.length;i++){
    row=Math.floor(Math.random()*4);
    colum=Math.floor(Math.random()*4);
    if(twoDArray[row][colum]==undefined){
        twoDArray[row][colum]=arrayOfImages[i];
    }else{
        i--;
    } 
}
//show all images in the begining for 2 seconds
let allImages=document.querySelectorAll("table img");
for(let i=0;i<twoDArray.length;i++){
    for(let j=0;j<twoDArray.length;j++){
     allImages[3*i+(i+j)].src=twoDArray[i][j];
    }
}

let startId=setInterval(function(){
for(i=0;i<allImages.length;i++){
    allImages[i].src="images/0.jpg";
}
 clearInterval(startId);

},2000);



let numOfClicks=-1;  //means no clicks  0-->means one click   1-->means two cilcks
let matched=false;
let endOfTheGameWin=0;
let endOfTheGameLose=4;
var selectedImages=new Array(2);
var liveText=document.querySelector("span");
//clicking on img
firstTable.onclick=function(event){
    numOfClicks++;
    //enter only at 0 and 1
    if(numOfClicks < 2){
     if(event.target.localName=="img"){
        //row index in the table
        var rowNumber=event.target.parentElement.parentElement.rowIndex;
        //column index the table
        var columnNumber=event.target.parentElement.cellIndex;
        //set the random img to the selected img
        event.target.src=twoDArray[rowNumber][columnNumber];
        selectedImages[numOfClicks]=event.target;
        //make all clicks in the same image as one click and disable the matched ones
        if(numOfClicks==0 && (selectedImages[0].name=="matched")){
            
            numOfClicks=-1;

        }else if(numOfClicks==1 &&
            (selectedImages[0].parentElement.parentElement.rowIndex==rowNumber &&
            selectedImages[0].parentElement.cellIndex==columnNumber ||
            selectedImages[1].name=="matched")){
                numOfClicks=0;

        }else if(numOfClicks==1 ){
            if(selectedImages[0].src==selectedImages[1].src){
                matched=true;
            }
       let delayId= setInterval(function(){
            
            if(matched==false){
                selectedImages[0].src= event.target.src="images/0.jpg";
                endOfTheGameLose--;
                liveText.innerText=endOfTheGameLose;
                numOfClicks=-1;
                clearInterval(delayId);
                //lose after four wrong trys
                if(endOfTheGameLose==0){
                    alert(" you lose try again!");
                    window.location="Memory.html";
                }
            }else if(matched==true){
                selectedImages[0].name=selectedImages[1].name="matched";
                endOfTheGameWin++;
                numOfClicks=-1;
                matched=false;
                clearInterval(delayId);
                //win after all images match
                if(endOfTheGameWin==8){
                    alert("congratulations you won!");
                    window.location="Memory.html";
                }
               
            }
        },1000)  

       }
     }
    }
}