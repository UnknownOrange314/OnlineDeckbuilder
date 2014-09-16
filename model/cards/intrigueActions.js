function IntrigueActions(){

}


IntrigueActions.shantyTown=function(user,game){
    var hand=user.getHand();
    var actions=false;
    hand.forEach(function(card){
        if(card.getMainType()==CardDef.Action){
            console.log("Found action with name:"+card.getName());
            actions=true;
        }
    });
    if(actions==false){
        user.drawCards(2);
    }
}

IntrigueActions.conspirator=function(user,game){
    if(user.countPlayedCards()>=2){
        user.drawCards(1);
        user.addActions(1);
    }
}
