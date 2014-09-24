
function Game(){

    var turns=1;
    var p1=new Player(this);//The player
    var p2=new Player(this);
    var activePlayer=p1;
    var piles={};
    var log=new Log();

    this.playCardByID=function(idx){
        p1.playCardByID(idx);
    }

    this.countEmptyPiles=function(){
        var empty=0;
        Object.keys(piles).forEach(function(name){
            var pile=piles[name];
            if(pile.getCardNum()==0){
                console.log("Empty pile:"+name)
                empty++;
            }
        });
        return empty;
    }

    this.gameEnd=function(){
        if(piles[CardDef.VP4].getCardNum()==0){
            return true;
        }
        var empty=this.countEmptyPiles();
        if(empty>=3){
            return true;
        }
        return false;
    }

    this.nextTurn=function(){
        log.clear();
        p1.endTurn();
        turns++;
        activePlayer=p2;
        AI.takeTurn(p2,this,log);
        p2.endTurn();
        activePlayer=p1;
        p1.startTurn();
    }

    this.hasCard=function(card){
        return (card.getName()) in piles;
    }

    var findSupplyPile=function(name){
        return piles[name];
    }

    this.removeFromSupply=function(card){
        var pile=piles[card.getName()];
        return pile.remove(card.getName());
    }

    this.getPlayers=function(){
        var players=[];
        players.push(p1);
        players.push(p2);
        return players;
    }



    //Sets up the game and the view;
    this.setup=function(){
        p1.createDeck();
        p1.shuffle();
        p1.drawCards(5);

        p2.createDeck();
        p2.shuffle();
        p2.drawCards(5);

        piles[CardDef.curse.getName()]=new Pile(CardDef.curse);
        piles[CardDef.copper.getName()]=new Pile(CardDef.copper);
        piles[CardDef.silver.getName()]=new Pile(CardDef.silver);
        piles[CardDef.gold.getName()]=new Pile(CardDef.gold);
        piles[CardDef.harem.getName()]=new Pile(CardDef.harem);

        piles[CardDef.estate.getName()]=new Pile(CardDef.estate);
        piles[CardDef.duchy.getName()]=new Pile(CardDef.duchy);
        piles[CardDef.province.getName()]=new Pile(CardDef.province);
        piles[CardDef.colony.getName()]=new Pile(CardDef.colony);

        var randCards=0;
        while(randCards<10){
            var idx=Math.floor((Math.random())*CardDef.kingdomCards.length);
            var card=CardDef.kingdomCards[idx];
            card.addSubtype(new KingdomCard());
            if(!(card.getName() in piles)){
                randCards++;
                piles[card.getName()]=new Pile(card);
            }
        }

        Object.keys(piles).forEach(function(name){
            var pile=piles[name];
            pile.addSupply(pile.getDefaultSupply());
        });

        log.push("Setting up game");

    }

    this.getPlayerStatus=function($scope){
        var data={};
        data["money"]=p1.getMoney();
        data["actions"]=p1.getActions();
        data["buys"]=p1.getBuys();
        data["draw"]=p1.drawSize();
        data["discard"]=p1.discardSize();
        return data;
    }

    this.getActiveHand=function(){
        return activePlayer.getHand();
    }

    this.getActivePlay=function(){
        return activePlayer.getPlayed();
    }

    this.getPiles=function(){
        return piles;
    }

    this.getPileData=function(){
        var data=[];
        Object.keys(piles).forEach(function(name){
            var pile=piles[name];
            data.push({'info':pile.getTopCard(),'cardDef':pile.getCardInfo(),'num':pile.getCardNum()});

        });
        return data;
    }

    this.playCardByID=function(id){
        var card=activePlayer.playCardByID(id);
        log.push(card);
        return card;
    }

    /**
     * The active player will buy a card.
     * @param id
     */
    this.buyCard=function(name){
        var pile=piles[name];
        var card=pile.removeCard();
        if(activePlayer.buyCard(card)==true){
            log.push("Purchased "+name);
        }else{
            pile.addCardToHand(card);
            log.push("Not enough money to buy "+name);
        }
    }

    /**
     * Plays all treasures from the active player's hand.
     */
    this.playTreasures=function(){
        p1.playTreasures();
    }

    this.getLogMessages=function(){
        return log.toArray();
    }

    this.addToLog=function(message){
        log.push(message);
    }

    this.getScores=function(){
        var scores={};
        scores["p1"]=p1.countPoints();
        scores["p2"]=p2.countPoints();
        if(scores["p1"]>scores["p2"]){
            scores["winner"]="Player 1";
        }else{
            scores["winner"]="Player 2";
        }
        return scores;
    }

    this.removeCard=function(cDef){
        return this.removeFromSupply(cDef);
    }

    this.giveCard=function(player,cDef){
        console.log("Name:"+cDef.getName());
        var card=this.removeFromSupply(cDef);
        player.gainCard(card);
    }

    this.getActivePlayer=function(){
        return activePlayer;
    }
}