
function Treasure(amt,setupNum,rules){

    var money=amt;
    var points=0;


    this.specialRules=function(player,game){
        if(rules!=null){
            rules(player,game);
        }
    }

    this.getMoney=function(){
        return money;
    }

    this.getPoints=function(){
        return 0;
    }

    this.setupNum=function(){
        return setupNum;
    }

    this.getMainType=function(){
        return CardDef.Treasure;
    }

    this.requiresInput=function(){
        return false;
    }

    this.getVP=function(){
        return points;
    }
}

Treasure.copper=new Treasure(1,60);
Treasure.silver=new Treasure(2,40);
Treasure.gold=new Treasure(3,30);
Treasure.platinum=new Treasure(5,10);

Treasure.harem=new Treasure(2,8);

Treasure.venture=new Treasure(1,10,TreasureRules.venture);
Treasure.bank=new Treasure(1,10,TreasureRules.bank);
