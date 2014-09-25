function Player(game){

    var drawDeck=Array();
    var discard=Array();
    var hand=Array();
    var played=Array();
    var durations=Array();

    var money=0;
    var actions=1;
    var buys=1;

    this.getDiscard=function(){
        return discard.slice();
    }

    this.removeFromDiscard=function(card){
        discard.splice(discard.indexOf(card));
    }

    //Does the player have any cards that block attacks?
    this.attackBlock=function(){
        var block=false;
        durations.forEach(function(card){
            if(card.getData()==CardDef.lighthouse){
                block=true;
            }
        });
        return block;
    }

    this.countPlayedCards=function(){
        return played.length;
    }

    this.playCount=function(card){
        var c=0;
        played.forEach(function(item){
            if(item.getName()==card.getName()){
                c++;
            }
        });
        return c;
    }

    this.addMoney=function(add){
        money+=add;
    }

    this.addBuy=function(add){
        buys+=add;
    }

    this.addActions=function(add){
        actions+=add;
    }

    this.getMoney=function(){
        return money;
    }

    this.getActions=function(){
        return actions;
    }

    this.getBuys=function(){
        return buys;
    }

    this.discardSize=function(){
        return discard.length;
    }

    this.drawSize=function(){
        return drawDeck.length;
    }

    this.showStatus=function(){
        actions=1;
        buys=1;
        money=0;
    }

    this.removeLastPlayed=function(){
        played.pop();
    }

    this.createDeck=function(){
        for(var i=0;i<3;i++){
            var estate=new Card(CardDef.estate);
            estate.setOwner(this);
            discard.push(estate);
        }
        for(i=0;i<7;i++){
            var copper=new Card(CardDef.copper);
            copper.setOwner(this);
            discard.push(copper);
        }
    }

    this.addCardsToHand=function(cards){
        cards.forEach(function(card){
            hand.push(card);
        });
    }

    this.addCardToHand=function(card){
        hand.push(card);
    }

    this.topDraw=function(card){
        return drawDeck[drawDeck.length-1];
    }
    this.shuffle=function(){
        drawDeck=discard.slice(0);
        discard=[];
        var counter = drawDeck.length, temp, index;
        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            temp = drawDeck[counter];
            drawDeck[counter] = drawDeck[index];
            drawDeck[index] = temp;
        }
    }

    this.removeTop=function(){
        if(drawDeck.length<=0){
            this.shuffle();
        }
        if(drawDeck.length==0){ //The entire deck has been drawn.
            return null;
        }
        return drawDeck.pop();
    }

    this.drawCards=function(num){
        for(var i=0;i<num;i++){
            if(drawDeck.length==0){ //The entire deck has been drawn.
                this.shuffle();
            }
            if(drawDeck.length==0){ //There are no cards after the shuffle.
                return;
            }
            hand.push(this.removeTop());
        }
    }

    this.discardFromDraw=function(num){
        for(var i=0;i<num;i++){
            if(drawDeck.length==0){
                this.shuffle();
            }
            discard.push(drawDeck.pop());
        }
    }

    this.gainToDraw=function(card){
        drawDeck.push(card);
    }

    this.discard=function(num){
        for(var i=0;i<num;i++){
            if(hand.length==0){
                return;
            }else{
                discard.push(hand.pop());
            }
        }
    }

    this.discardHand=function(){
        this.discard(hand.length);
    }


    this.gainCards=function(cards){
        discard=discard.concat(cards);
    }


    this.canPlayCard=function(card){
        if(card.getMainType()==CardDef.Action){
            return actions>0;
        }
        return true;
    }

    this.resolveCard=function(card){
        if(card.hasDuration()){
            durations.push(card);
        }else{
            played.push(card);
        }
        if(card.getMainType()==CardDef.Action){
                money+=card.getMoney();
                actions+=card.getActions();
                buys+=card.getBuys();
                this.drawCards(card.getCards());
                card.specialRules(this,game);
        }if(card.getMainType()==CardDef.Treasure){
            money+=card.data.getTreasureMoney();
            card.specialRules(this,game);
        }

        return card;
    }

    this.playCardFromHand=function(card){
        if(this.canPlayCard(card)){
            actions--;
            var idx=hand.indexOf(card);
            hand.splice(idx,1);
            if(card.getMainType()==CardDef.Treasure){ //You cannot play actions after playing a treasure.
                actions=0;
            }
            this.resolveCard(card);
            return card;
        }
    }

    /**
     * Plays the card from the player's hand with the specified id.
     * @param id
     */
    this.playCardByID=function(id){
        for(var i=0;i<hand.length;i++){
            if(hand[i].getID()==id){
                return this.playCardFromHand(hand[i]);
            }
        }
    }

    /**
     * Clear all the cards from the play area at the end of the turn.
     */
    this.cleanup=function(){
        for(var i=0;i<played.length;i++){
            discard.push(played[i]);
        }
        money=0;
        buys=0;
        actions=0;
        played=[];
    }

    this.gainCard=function(card){
        discard.push(card);
        card.setOwner(this);
    }
    /**
     * Buys a card for the player.
     * @param card
     * @returns Returns true if the purchase succeeds. Returns false if the purchase fails.
     */
    this.buyCard=function(card){
        if(card.getCost()<=money&&buys>0){
            buys--;
            money-=card.getCost();
            this.gainCard(card);
            return true;
        }
        return false;
    }

    this.endTurn=function(){
        this.cleanup();
        this.discardHand();
        this.drawCards(5);
        actions=1;
        buys=1;
    }

    this.getHand=function(){
        return hand;
    }

    this.getPlayed=function(){
        return played;
    }

    /**
     * Plays all treasures from the active player's hand.
     */
    this.playTreasures=function(){
        actions=0;
        var newHand=Array();
        for(var i=0;i<hand.length;i++){
            if(hand[i].getMainType()==CardDef.Treasure){
                money+=hand[i].getTreasureMoney();
                played.push(hand[i]);
                hand[i].specialRules(this,game);
            }else{
                newHand.push(hand[i]);
            }
        }
        hand=newHand;
    }

    this.getFullDeck=function(){
        var cards=discard.concat(drawDeck);
        cards=cards.concat(hand);
        return cards;
    }

    this.countPoints=function(){
        var fullDeck=this.getFullDeck();
        var vp=0;
        fullDeck.forEach(function(card){
            vp+=card.getVP(fullDeck);
        });
        return vp;
    }

    this.setHand=function(newHand){
        hand=newHand;
    }

    this.startTurn=function(){
        var THIS=this;
        durations.forEach(function(card){
            var duration=card.getDuration();
            actions+=duration.getActions();
            money+=duration.getMoney();
            THIS.drawCards(duration.getCards());
            buys+=duration.getBuys();
            discard.push(card);
        });
        durations=Array();
    }
}