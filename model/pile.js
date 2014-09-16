function Pile(cardInfo){

    var supply=[];

    this.getDefaultSupply=function(){
        if(cardInfo.getMainType()==CardDef.Victory){
            return 8;
        }if(cardInfo.getMainType()==CardDef.Action){
            return 10;
        }
        if(cardInfo.getName()==CardDef.copper.getName()){
            return 60;
        }if(cardInfo.getName()==CardDef.silver.getName()){
            return 40;
        }if(cardInfo.getName()==CardDef.gold.getName()){
            return 20;
        }if(cardInfo.getName()==CardDef.platinum.getName()){
            return 10;
        }
    }

    this.addSupply=function(num){
        for(var i=0;i<num;i++){
            supply.push(new Card(cardInfo));
        }
    }

    this.remove=function(card){
        return supply.pop();
    }

    this.getCardInfo=function(){
        return cardInfo;
    }

    this.getCardNum=function(){
        return supply.length;
    }

    this.removeCard=function(){
        return supply.pop();
    }

    this.addCardToHand=function(card){
        supply.push(card);
    }

    this.getTopCard=function(){
        return supply[0];
    }
}


