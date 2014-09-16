function DarkAgeActions(){
}

DarkAgeActions.poorHouse=function(player,game){
    player.addMoney(4);
    player.getHand().forEach(function(card){
        if(card.getMainType()==CardDef.Treasure){
            if(player.getMoney()>0){
                player.addMoney(-1);
            }
        }
    });
}

DarkAgeActions.vagrant=function(player,game){
    var card=player.topDraw();
    if(card==undefined){ //We have drawn our entire deck.
        return;
    }
    if(card.hasType(CardDef.Victory)||card.hasType(CardDef.CurseType)||card.hasType(CardDef.Ruins)||card.hasType(CardDef.Shelter)){
        player.drawCards(1);
        game.addToLog("Card drawn with Vagrant");
    }
}

DarkAgeActions.sage=function(player,game){
    var discard=Array();
    while(true){
        var card=player.removeTop();
        if(card==null){
            player.gainCards(discard);
        }
        if(card.getCost()>=3){
            player.addCardToHand(card);
            player.gainCards(discard);
            return;
        }else{
            discard.push(card);
        }
    }
}

DarkAgeActions.ironmonger=function(player,game){
    console.log("Playing ironmonger");
}


