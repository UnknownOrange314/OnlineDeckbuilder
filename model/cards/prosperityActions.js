function ProsperityActions(){

}

ProsperityActions.city=function(user,game){
    console.log("Empty:"+game.countEmptyPiles());
    if(game.countEmptyPiles()==1){
        user.drawCards(1);
    }if(game.countEmptyPiles()==2){
        user.addMoney(1);
        user.addBuy(1);
    }
}

ProsperityActions.countingHouse=function(user,game){
    var coppers=Array();
    user.getDiscard().forEach(function(card){
       if(card.getData()==CardDef.copper){
           coppers.push(card);
           user.removeFromDiscard(card);
       }
    });
    user.addCardsToHand(coppers);
}