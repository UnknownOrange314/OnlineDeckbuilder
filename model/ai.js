function AI(){}

AI.takeTurn=function(deck,game,log){

    log.push("Starting AI turn");

    var hand=deck.getHand();
    hand.forEach(function(card){
        if(card.getMainType()==CardDef.Action&&deck.getActions()>0){
            deck.playCardFromHand(card);
        }
    });

    deck.playTreasures();
    var piles=game.getPileData();
    while(deck.getBuys()>0){
        var bestCard=null;
        var maxCost=1;
        piles.forEach(function(pile){
            var info=pile['cardDef'];
            if(info.getCost()>maxCost&&deck.getMoney()>info.getCost()&&pile['num']>0){
                maxCost=info.getCost();
                bestCard=info.getName();
            }
        });
        if(bestCard!=null){
            game.buyCard(bestCard);
        }else{
            break;
        }
    }

    log.push("Finished AI turn");
}