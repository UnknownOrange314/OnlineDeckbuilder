function HinterlandsActions(){
}

HinterlandsActions.crossroads=function(user,game){
    var vCards=0;
    user.getHand().forEach(function(card){
        if(card.getMainType()==CardDef.Victory){
            vCards++;
        }
    });
    user.drawCards(vCards);
    console.log(user.playCount(CardDef.crossroads));
    if(user.playCount(CardDef.crossroads)==0){
        user.addActions(3);
    }
}