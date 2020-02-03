
 
const cards = document.querySelectorAll('.memory-card');

const switchOn = document.getElementById("switch");


let i = (localStorage.getItem("Green_team") ? localStorage.getItem("Green_team") : 0);
let n = (localStorage.getItem("Red_team") ? localStorage.getItem("Red_team") : 0);

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let gameOn = false;

switchOn.addEventListener("click", (e) =>{
  element1 = document.getElementById("1");
  element2 = document.getElementById("2");
  if(gameOn === false && 
     element2.innerHTML === "ON" && 
     element1.innerHTML === "OFF"){
    element2.innerText = "OFF";
    element1.innerText = "ON";
    gameOn = true;
   } else {  
     element1.innerText = "OFF";   
     element2.innerText = "ON"; 
     gameOn = false;
  }

  
 })


  function flipCard() {
     if (lockBoard) return; 
     if (this === firstCard) return; 
    this.classList.add('flip');
    
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
     return;
  }
  
  

   secondCard = this;
  
   checkForMatch();
 }

 function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    let isNotMatch = firstCard.dataset.framework != secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
   
    if(gameOn === false){
      if(document.querySelector(".oop").className === "oop" && isMatch || isNotMatch){
        i ++;
        document.querySelector(".oop").innerHTML = i;
        
     } 
    }
    if(gameOn === true){
      if(document.querySelector(".oops").className === "oops" && isMatch || isNotMatch){
        n ++;
        document.querySelector(".oops").innerHTML = n;
        
     }
    }
   
    saveIntoStorage();
 }

 function disableCards() {
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);

   resetBoard();
 }

 function unflipCards() {
    lockBoard = true;

   setTimeout(() => {
     firstCard.classList.remove('flip');
     secondCard.classList.remove('flip');

     resetBoard();
   }, 1500);
 }

 function resetBoard(){
 [hasFlippedCard, lockBoard] = [false, false];
 [firstCard, secondCard] = [null, null];
 }

    (function shuffle (){
        cards.forEach(card => {
            let randomPo = Math.floor(Math.random() * 12);
            card.style.order = randomPo; 
        });
    })();

  


saveIntoStorage = () =>{
  localStorage.setItem("Red_team", n);
  localStorage.setItem("Green_team", i);
}

//window.location.reload()
cards.forEach(card => card.addEventListener('click', flipCard));


let resartGame = document.getElementById("refresh").addEventListener("click", () => {
//  const app = document.querySelector(".memory-game");
//  while(app.firstChild){
//      app.removeChild(app.firstChild);
//  }
     flipCard();

});

let reset = document.getElementById("reset").addEventListener("click", () => {
   
  localStorage.setItem("Red_team", 0);
  localStorage.setItem("Green_team", 0);

    setTimeout(() => {
        window.location.reload();
    }, 500);
})
  
  
