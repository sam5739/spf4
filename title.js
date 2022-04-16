class title {
   constructor(){
    this.title = createElement('h1');
   }

   setElementsStyle() {
    this.title.class("gameTitle");
  }


   display(){
    this.title.html("Welcome to SpaceFighter game aka SPF");
    this.title.position(350, 0);
    this.title.style.color= "white";
    this.setElementsStyle(); 
   }
}