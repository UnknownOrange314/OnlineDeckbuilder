function SeasideActions(){
}


SeasideActions.treasureMap=function(user,game){
    var hand=user.getHand();
    var maps=Array();
    for(var i=0;i<hand.length;i++){
        var card=hand[i];
        if(card.getData()==CardDef.treasureMap){
            maps.push(card);
            break;
        }
    }
    console.log("Maps:"+maps.length)
    if(maps.length>=1){
        user.removeLastPlayed();
        hand.splice(hand.indexOf(maps[0]),1);
        user.setHand(hand);
    }
    for(i=0;i<4;i++){
        var gold=game.removeCard(CardDef.gold);
        user.gainToDraw(gold);
    }
}

SeasideActions.tactician=function(user,game){
    user.discard(user.getHand().length);
}