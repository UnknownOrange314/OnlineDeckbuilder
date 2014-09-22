/**
 * Actions from the base set that are not attacks.
 * @constructor
 */
function BaseSetActions(){
}

BaseSetActions.councilRoom=function(user,game){
    game.getPlayers.forEach(function(player){
        if(player!=user){
            player.drawCards(1);
        }
    });
}

BaseSetActions.adventurer=function(user,game){
    var drawn=Array();
    var tCount=0;
    while(tCount<2){
        var card=user.removeTop();
        if(card==null){
            break;
        }
        if(card.getMainType()==CardDef.Treasure){
            user.resolveCard(card);
            tCount++;
        }else{
            drawn.push(card);
        }
    }
    user.gainCards(drawn);
}

BaseSetActions.chapelTrash=function(selCards,user){
    var newHand=Array();
    console.log(user);
    var maxTrash=4;
    var tCount=0;
    user.getHand().forEach(function(card){
        console.log(card.getID());
        if(tCount>=maxTrash||selCards.indexOf(card.getID())==-1){ //We did not chose to trash the card.
            newHand.push(card);
        }else{
            tCount++;
        }

    });
    user.setHand(newHand);
}

BaseSetActions.moneylender=function(selCards,user){
    var newHand=Array();
    user.getHand().forEach(function(card){
        if(card.getData()==CardDef.copper){
            user.addMoney(3);
        }
        newHand.push(card);
    });
    return newHand;
}