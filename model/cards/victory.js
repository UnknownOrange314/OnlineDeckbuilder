
function Victory(points){

    var specialCalc=null;

    this.setSpecialFun=function(fun){
        specialCalc=fun;
    }

    this.getMoney=function(){
        return 0;
    }

    this.getVP=function(owner){
        var score=points;
        if(specialCalc!=null){
            if(owner!=null){
                score+=specialCalc(owner);
            }
        }
        return score;
    }

    this.getMainType=function(){
        return CardDef.Victory;
    }

    this.requiresInput=function(){
        return false;
    }

}

Victory.gardenPoints=function(player){
    var deck=player.getFullDeck();
    return Math.floor(deck.length/10);
}

Victory.silkRoadPoints=function(player){
    var deck=player.getFullDeck();
    var ct=0;
    deck.forEach(function(card){
        if(card.getMainType()==CardDef.Victory){
            ct++;
        }
    });
    return Math.floor(ct/4);
}

Victory.dukePoints=function(player){
    var deck=player.getFullDeck();
    var ct=0;
    deck.forEach(function(card){
        if(card.getData()==CardDef.duchy){
            ct++;
        }
    });
    return ct;
}

Victory.feodumPoints=function(player){
    var deck=player.getFullDeck();
    var ct=0;
    deck.forEach(function(card){
        if(card.getData()==CardDef){
            ct++;
        }
    });
    return ct;
}

Victory.fairgroundPoints=function(player){
    var deck=player.getFullDeck();
    var unique=Array();
    deck.forEach(function(card){
        var data=card.getData();
        if(unique.indexOf(data)==-1){
            unique.push(data);
        }
    });
    return 2*Math.floor(unique/5);
}


Victory.curse=new Victory(-1);
Victory.estate=new Victory(1);
Victory.duchy=new Victory(3);
Victory.province=new Victory(6);
Victory.colony=new Victory(10);
Victory.setupNum=8;

Victory.gardens=new Victory(0);
Victory.gardens.setSpecialFun(Victory.gardenPoints);

Victory.silkRoad=new Victory(0);
Victory.silkRoad.setSpecialFun(Victory.silkRoadPoints);

Victory.duke=new Victory(0);
Victory.duke.setSpecialFun(Victory.dukePoints);

Victory.feodum=new Victory(0);
Victory.feodum.setSpecialFun(Victory.feodumPoints);

Victory.fairgrounds=new Victory(0);
Victory.fairgrounds.setSpecialFun(Victory.fairgroundPoints);