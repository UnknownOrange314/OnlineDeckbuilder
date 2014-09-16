function AttackAction(){

}

AttackAction.witch=function(user,game){
    Action.giveJunk(game,user,CardDef.curse);
}

AttackAction.soothsayer=function(user,game){
    var attacked=Action.giveJunk(game,user,CardDef.curse);
    attacked.forEach(function(player){
        player.drawCards(1);
    });
    game.giveCard(user,CardDef.gold);
}

AttackAction.cutpurse=function(user,game){
    game.getPlayers().forEach(function(player){
        if(player!=user&&player.attackBlock()==false){
            var hand=player.getHand();
            for(var i=0;i<hand.length;i++){
                if(hand[i].getName()=="Rock"){
                    hand.splice(i);
                    break;
                }
            }
        }
    });
}

AttackAction.seaHag=function(user,game){
    game.getPlayers().forEach(function(player){
        if(player!=user&&player.attackBlock()==false){
            player.discardFromDraw(1);
            var curse=game.removeCard(CardDef.curse);
            console.log("Curse:"+JSON.stringify(curse));
            player.gainToDraw(curse);
        }
    });
}

