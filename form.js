class Form {

    constructor() {
      this.input = createInput("").attribute("placeholder", "Enter your name");
      this.button = createImg('assets/start.png',"image");
      //this.question = createElement('h1');
      this.message = createElement("h2")
      this.greeting=createElement("h2");
      this.buttonText= createElement("h1");
    }
  
    hide(){
      this.input.hide();
      this.button.hide();
     //this.message.hide();
    }
  
    setElementsStyle() {
      this.input.class("customInput");
    }

    handleMousePressed() {
     
      this.button.mousePressed(() => {
        this.input.hide();
        this.button.hide();
        var message = 
        `Hello ${this.input.value()}`;
        this.message.html(message);
        leaderboard.name= this.input.value();
        leaderboard.addPlayer();
        this.message.position(500, 50);
        setTimeout(() => {
           this.message;
        } ,1000);
        gameState = 2;
        
      });

    }

    display(){
      this.message.class("gameTitle")
      this.button.position(450, 450);
      this.button.size(200,60);
      //this.buttonText = text("Sumbit", 400,350);
      this.buttonText.class("gameTitle");
      this.input.position(width / 2 - 110, height / 2 );
     this.handleMousePressed();
     this.setElementsStyle(); 
      
     }
  }
