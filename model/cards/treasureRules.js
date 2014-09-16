function TreasureRules(){
}

TreasureRules.venture=function(user,game){
    var discard=Array();
    while(true){
        var card=user.removeTop();
        if(card.getMainType()==CardDef.Treasure){
            user.resolveCard(card);
            user.gainCards(discard);
        }else{
            discard.push(card);
        }
    }
}

TreasureRules.bank=function(user,game){
    var cards=user.getPlayed();
    var money=1;
    cards.forEach(function(card){
        if(card.getMainType()==CardDef.Treasure){
            money++;
        }
    });
    user.addMoney(money);
}