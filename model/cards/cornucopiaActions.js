function CornucopiaActions(){

}

CornucopiaActions.menagerie=function(user,game){
    var uniqueCards=Array();
    var hand=user.getHand();
    hand.forEach(function(card){
        if(uniqueCards.indexOf(card.getData())==-1){
            uniqueCards.push(card.getData());
        }
    });
    if(uniqueCards.length==hand.length){
        console.log("Draw 3");
        user.drawCards(3);
    }else{
        user.drawCards(1);
    }
}

CornucopiaActions.farmingVillage=function(user,game){
    var discard=Array();
    while(true){
        var card=user.removeTop();
        if(card.getMainType()==CardDef.Action||card.getMainType()==CardDef.Treasure){
            user.addCardToHand(card);
            discard.forEach(function(card){
                user.gainCards(discard);
            });
            return;
        }
    }
}

CornucopiaActions.huntingParty=function(user,game){
    var discard=Array();
    var hand=user.getHand();
    while(true){
        var card=user.removeTop();
        if(card==null){ //The entire deck has been drawn.
            user.gainCards(discard);
            return;
        }
        var inHand=false;
        hand.forEach(function(item){
            if(item.getName()==card.getName()){
                inHand=true;
            }
        });
        if(inHand=true){
            discard.push(card);
            console.log(discard.length);
        }else{
            user.addCardToHand(card);
            user.gainCards(discard);
            return;
        }
    }
}

CornucopiaActions.harvest=function(user,game){
    var discard=Array();
    var unique=Array();
    for(var i=0;i<4;i++){
        var card=user.removeTop();
        var data=card.getData();
        if(unique.indexOf(data)!=1){
            unique.splice(unique.indexOf(data));
        }else{
            unique.push(data);
        }
        discard.push(card);
    }
    user.gainCards(discard);
    user.addMoney(unique.length);
}
