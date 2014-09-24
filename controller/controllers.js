'use strict';

function Render(){

    var game=new Game();
    game.setup();
    var cardInterface=new PlayOpt(game);

    this.getOptCard=function(){
        return cardInterface.getOptCard();
    }

    this.setOptCard=function(card){
        cardInterface.setOptCard(card);
    }

    this.toggleSelect=function(id){
        cardInterface.toggleSelect(id);
    }

    this.selectedCards=function(){
        return cardInterface.selectedCards();
    }

    /**
     * This function is to play a card after additional input was provided
     */
    this.resolvePlay=function(){
        cardInterface.resolvePlay();
    }

    this.kingdomCards=function(){
        var data=[];
        var piles=game.getPileData();
        for(var i=0;i<piles.length;i++){
            var card=piles[i]['info'];
            if(piles[i]['cardDef'].hasType(CardDef.Kingdom)){
                if(card==undefined){
                    data.push({'data':"Supply empty"})
                }else{
                    var cData=Render.getCardRender(piles[i]['info']);
                    cData['num']=piles[i]['num'];
                    data.push(cData);
                }

            }
        }
        return data;
    }

    this.treasureSupply=function(){
        var data=[];
        var piles=game.getPileData();
        for(var i=0;i<piles.length;i++){
            var card=piles[i]['info'];
            var cDef=piles[i]['cardDef']
            if(cDef.getMainType()==CardDef.Treasure&&(!cDef.hasType(CardDef.Kingdom))){
                if(card==undefined){
                    data.push({'data':"Supply empty"})
                }else{
                    var tData=Render.getTreasureData(card);
                    tData['num']=piles[i]['num'];
                    data.push(tData);
                }
            }
        }
        return data;
    }

    this.victorySupply=function(){
        var data=[];
        var piles=game.getPileData();
        for(var i=0;i<piles.length;i++){
            var card=piles[i]['info'];
            var cDef=piles[i]['cardDef'];
            if(cDef.getMainType()==CardDef.Victory&&(!cDef.hasType(CardDef.Kingdom))){
                if(card==undefined){
                    data.push({'data':"Supply empty"})
                }else{
                    var vData=Render.getVictoryData(card);
                    vData['num']=piles[i]['num'];
                    data.push(vData);
                }
            }
        }
        return data;
    }

    this.handData=function(){
        var data=[];
        var hand=game.getActiveHand();
        for(var i=0;i<hand.length;i++){
            data.push(Render.getCardRender(hand[i]));
        }
        return data;
    }

    this.playArea=function(){
        var data=[];
        var play=game.getActivePlay();
        for(var i=0;i<play.length;i++){
            data.push({'name':play[i].getName(),'data':play[i].cardInfo()});
        }
        return data;
    }

    this.getActivePlayer=function(){
        return game.getActivePlayer();
    }

    this.endTurn=function(){
        game.nextTurn();
    }

    this.getPlayerStatus=function(){
        return game.getPlayerStatus();
    }

    this.buyCard=function(name){
        game.buyCard(name);
    }

    this.playCardByID=function(id){
        return game.playCardByID(id);
    }

    this.playTreasures=function(){
        game.playTreasures();
    }

    this.getLogMessages=function(){
        return game.getLogMessages();
    }

    this.gameEnd=function(){
        return game.gameEnd();
    }

    this.getScores=function(){
        return game.getScores();
    }

    this.getActivePlayer=function(){
        return game.getActivePlayer();
    }
}

Render.getActionData=function(card){
    var aData={'name':card.getName(),
        'cost':"$"+card.getCost(),
        'id':card.getID(),
        'rules':card.getRules()}
    var data="";
    if(card.getActions()>0){
        data+="+"+card.getActions()+" mana ";
    }if(card.getCards()>0){
        data+="+"+card.getCards()+" spell";
    }if(card.getBuys()>0){
        data+="+"+card.getBuys()+ " purchase";
    }if(card.getMoney()>0){
        data+=" +$"+card.getMoney();
    }
    aData["data"]=data;
    return aData;
}

Render.getTreasureData=function(card){
    return {'name':card.getName(),'data':"+$"+card.getTreasureMoney(),'cost':"$"+card.getCost(),'id':card.getID()};
}

Render.getVictoryData=function(card){
    return {'name':card.getName(),'cost':"$"+card.getCost(),'data':"+"+card.getVP()+" VP",'id':card.getID()};
}

Render.getCardRender=function(card){
    if(card.getMainType()==CardDef.Treasure){
        var tData=Render.getTreasureData(card);
        tData["type"]="Treasure";
        return tData;
    }if(card.getMainType()==CardDef.Victory){
        var vData=Render.getVictoryData(card);
        vData["type"]="Victory";
        return vData;
    }if(card.getMainType()==CardDef.Action){
        var aData=Render.getActionData(card);
        aData["type"]="Action";
        return aData;
    }
}

/* Controllers */
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function($scope) {

    //TODO: Consider using separate objects for these.
    var playCard="End turn";
    var selectCard="Finish selecting";

    var curMode=playCard;

    var game=new Render();

    var refreshData=function(){
        $scope.end="End turn";
        $scope.log=game.getLogMessages();
        $scope.actionSupply=game.kingdomCards();
        $scope.treasureSupply=game.treasureSupply();
        $scope.victorySupply=game.victorySupply();
        if(game.gameEnd()==false){
            $scope.hand=game.handData();
            $scope.play=game.playArea();
            var data=game.getPlayerStatus();
            $scope.money="$"+data["money"];
            $scope.actions="Mana:"+data["actions"];
            $scope.buys="Purchases:"+data["buys"];
            $scope.discardPile="Discard pile: "+data["discard"]+" cards";
            $scope.drawPile="Draw pile:"+data["draw"]+" cards";
            $scope.orderProp = 'age';

        }else{
            var log=Array();
            var pData=game.getScores();
            log.push("Game over");
            log.push("Player 1 score:"+pData["p1"]);
            log.push("Player 2 score:"+pData["p2"]);
            log.push("The winner is: "+pData["winner"]);
            $scope.log=log;
        }
    }

    refreshData();

    //Plays a card from a hand.
    $scope.playCard=function(id){

        if(curMode==playCard){
            var card=game.playCardByID(id);
            refreshData();
            if(card!=null){
                game.setOptCard(card);
                if(card.requiresInput()){
                    curMode=selectCard;
                    $scope.hand=card.getUI(game.getActivePlayer(),game.selectedCards());
                    $scope.end="Finish playing";
                    $scope.instructions=card.getRules();
                }
            }
        }else if(curMode==selectCard){
            game.toggleSelect(id);
            refreshData();
            $scope.end="Finish playing";
            console.log("Selecting cards");
            $scope.hand=game.getOptCard().getUI(game.getActivePlayer(),game.selectedCards());
        }
    }

    //Buys a card from the supply.
    $scope.buyCard=function(name){
        game.buyCard(name);
        refreshData();
    }

    $scope.changeView=function(){
        if(curMode==playCard){
            game.endTurn();
            refreshData();
        }if(curMode==selectCard){
            curMode=playCard;
            game.resolvePlay();
            $scope.instructions="";
            $scope.end="End turn";
            refreshData();
        }
    }

    $scope.playTreasures=function(){
        game.playTreasures();
        refreshData();
    }

    //This is the function that is called when a card is played ig further input is required.
    $scope.playOpt=function(id){

    }

});