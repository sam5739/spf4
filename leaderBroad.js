class Leaderboard{
  constructer(){
      this.name=null;
      this.score= null;
      
  }
  addPlayer(){
       var playerIndex = "players" ; 
        database.ref(playerIndex).set({
             name: this.name,
            //score: this.score
         }); 
        }
   
     static getPlayersInfo() { 
         var playerInfoRef = database.ref("players"); 
         playerInfoRef.on("value", data => { allPlayers = data.val(); });
         } 

         
      }
