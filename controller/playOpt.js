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

    this.toggleSelect=function(id){
        var idx=optSel.indexOf(id);
        if(idx==-1){  //Select card.
            optSel.push(id);
        }else{ //Deselect card.
            optSel.splice(idx,1);
        }
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