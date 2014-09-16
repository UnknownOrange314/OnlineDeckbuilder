/**
 * This is a function for setting up a user interface when you have to enter input
 * after playing a card
 * @constructor
 */
function PlayOpt(game){

    var optSel=Array();
    var optCard=null;

    this.getOptCard=function(){
        return optCard;
    }

    this.setOptCard=function(card){
        optCard=card;
    }

    this.playOpt=function(id){
        optSel.push(id);
    }

    /**
     * This function is to play a card after additional input was provided
     */
    this.resolvePlay=function(){
        optCard.play(optSel,game.getActivePlayer());
        optSel=[];
    }

    this.selectedCards=function(){
        return optSel;
    }
}