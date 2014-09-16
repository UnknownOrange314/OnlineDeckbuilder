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

    this.playOpt=function(id){
        cardInterface.playOpt(id);
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

    var getActionData=function(card){
        return {'name':card.getName(),
            'cost':"$"+card.getCost(),
            'data':"+"+card.getActions()+" actions"+" +"+card.getCards()+" cards"+" +"+card.getBuys()+ " buys"+" +$"+card.getMoney(),
            'id':card.getID()}
    }

    var getTreasureData=function(card){
        return {'name':card.getName(),'data':"+$"+card.getTreasureMoney(),'cost':"$"+card.getCost(),'id':card.getID()};
    }

    var getVictoryData=function(card){
        return {'name':card.getName(),'cost':"$"+card.getCost(),'data':"+"+card.getVP()+" VP",'id':card.getID()};
    }

    this.actionSupply=function(){
        var data=[];
        var piles=game.getPileData();
        for(var i=0;i<piles.length;i++){
            var card=piles[i]['info'];
            if(piles[i]['cardDef'].getMainType()==CardDef.Action){
                if(card==undefined){
                    data.push({'data':"Supply empty"})
                }else{
                    var cData=getActionData(card);
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
            if(piles[i]['cardDef'].getMainType()==CardDef.Treasure){
                if(card==undefined){
                    data.push({'data':"Supply empty"})
                }else{
                    var tData=getTreasureData(card);
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
            if(piles[i]['cardDef'].getMainType()==CardDef.Victory){
                if(card==undefined){
                    data.push({'data':"Supply empty"})
                }else{
                    var vData=getVictoryData(card);
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
            if(hand[i].getMainType()==CardDef.Treasure){
                var tData=getTreasureData(hand[i]);
                tData["type"]="Treasure";
                data.push(tData);
            }if(hand[i].getMainType()==CardDef.Victory){
                var vData=getVictoryData(hand[i]);
                vData["type"]="Victory";
                data.push(vData);
            }if(hand[i].getMainType()==CardDef.Action){
                var aData=getActionData(hand[i]);
                aData["type"]="Action";
                data.push(aData);
            }
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

/* Controllers */
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function($scope) {

    var game=new Render();
    var refreshData=function(){

        $scope.log=game.getLogMessages();
        $scope.actionSupply=game.actionSupply();
        $scope.treasureSupply=game.treasureSupply();
        $scope.victorySupply=game.victorySupply();

        if(game.gameEnd()==false){
            $scope.hand=game.handData();
            $scope.play=game.playArea();

            var data=game.getPlayerStatus();
            $scope.money="$"+data["money"];
            $scope.actions="Actions:"+data["actions"];
            $scope.buys="Buys:"+data["buys"];

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
        var card=game.playCardByID(id);
        if(card!=null){
            console.log("Playing card:"+card);
            game.setOptCard(card);
            if(card.requiresInput()){
                console.log("Processing input");
                $scope.options=card.getUI(game.getActivePlayer(),game.selectedCards());
                $scope.end="Finish playing";
                $scope.instructions=card.getRules();
            }
        }
        refreshData();
    }

    //Buys a card from the supply
    $scope.buyCard=function(name){
        game.buyCard(name);
        refreshData();
    }

    $scope.endTurn=function(){
        game.endTurn();
        refreshData();
    }

    $scope.playTreasures=function(){
        game.playTreasures();
        refreshData();
    }

    //This is the function that is called when a card is played
    $scope.playOpt=function(id){
        game.playOpt(id);
        console.log("Getting the UI with cards"+game.selectedCards());
        $scope.options=game.getOptCard().getUI(game.getActivePlayer(),game.selectedCards());

        refreshData();
    }

    //When you are done playing a card that requires input, this function is called
    $scope.finishPlay=function(){
        game.resolvePlay();
        $scope.options="";
        $scope.end="";
        $scope.instructions="";
        refreshData();
    }

});