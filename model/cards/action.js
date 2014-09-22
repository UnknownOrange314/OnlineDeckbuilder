/**
 *
 * @param action
 * @param card
 * @param money
 * @param special
 * @constructor
 */
function Action(action,card,money,buy,special){

    var inFun=null;
    var inRules=null;
    var inResFun=null; //The rules for the card that are processed after the user input.

    this.getMainType=function(){
        return CardDef.Action;
    }

    this.setInputUI=function(fun){
        inFun=fun;
    }

    this.setInputProcess=function(fun){
        inResFun=fun;
    }

    this.getPoints=function(){
        return 0;
    }

    this.getActions=function(){
        return action;
    }

    this.getCards=function(){
        return card;
    }

    this.getMoney=function(){
        return money;
    }

    this.getBuys=function(){
        return buy;
    }

    this.specialRules=function(player,game){
        if(special!=null){
            special(player,game);
        }
    }

    this.requiresInput=function(){
        return inFun!=null
    }

    this.inputUI=function(player,cards){
        return inFun(player,cards);
    }

    /**
     * This is to resolve the rules of a card after it is played and
     * the user makes the required inputs.
     * @param inputs A list of cards by id.
     */
    this.inputRules=function(inputs,player){
        inResFun(inputs,player);
    }

}

Action.giveJunk=function(game,user,card){
    var attacked=Array();
    //alert(card.getName());
    game.getPlayers().forEach(function(player){
        if(game.hasCard(card&&player.attackBlock())){
            if(player!=user){
                game.giveCard(player,card);
                attacked.push(player);
            }
        }
    })
    return attacked;
}



Action.abandonedMine=new Action(0,0,1,0,null);
Action.ruinedLibrary=new Action(0,1,0,0,null);
Action.ruinedMarket=new Action(0,0,0,1,null);
Action.ruinedVillage=new Action(1,0,0,0,null);

Action.necropolis=new Action(2,0,0,0,null);

Action.chapel=new Action(0,0,0,0,BaseSetActions.chapel);
Action.chapel.setInputUI(ChapelView.chapelUI);
Action.chapel.setInputProcess(BaseSetActions.chapelTrash);

Action.crossroads=new Action(0,0,0,0,HinterlandsActions.crossroads);
Action.lighthouse=new Action(1,0,1,0,null);
Action.lighthouseDuration=new Action(0,0,1,0,null);
Action.poorHouse=new Action(0,0,0,0,DarkAgeActions.poorHouse);
Action.vagrant=new Action(1,1,0,0,DarkAgeActions.vagrant);

Action.village=new Action(2,1,0,0,null);
Action.woodcutter=new Action(0,0,2,1,null);
Action.shantyTown=new Action(2,0,0,0,IntrigueActions.shantyTown);
Action.menagerie=new Action(1,0,0,0,CornucopiaActions.menagerie);
Action.fishingVillage=new Action(2,0,1,0,null);
Action.fishingVillageDuration=new Action(1,0,1,0,null);
Action.sage=new Action(1,0,0,0,DarkAgeActions.sage);
Action.greatHall=new Action(1,1,0,0,null);

Action.moneylender=new Action(0,0,0,0,BaseSetActions.moneylender);
Action.conspirator=new Action(0,0,2,0,IntrigueActions.conspirator);
Action.workersVillage=new Action(2,1,0,1,null);
Action.smithy=new Action(0,3,0,0,null);
Action.cutpurse=new Action(0,0,2,0,AttackAction.cutpurse);
Action.seaHag=new Action(0,0,0,0,AttackAction.seaHag);
Action.adventurer=new Action(0,0,0,0,BaseSetActions.adventurer);
Action.treasureMap=new Action(0,0,0,0,SeasideActions.treasureMap);
Action.caravan=new Action(1,1,0,0,null);
Action.carvanDuration=new Action(0,1,0,0,null);
Action.farmingVillage=new Action(2,0,0,0,CornucopiaActions.farmingVillage);
Action.ironmonger=new Action(1,1,0,0,DarkAgeActions.ironmonger);

Action.rabble=new Action(0,3,0,0,AttackAction.rabble);
Action.city=new Action(2,1,0,0,ProsperityActions.city);
Action.merchantShip=new Action(0,0,2,0,null);
Action.wharf=new Action(0,2,1,0,null);
Action.tactician=new Action(0,0,0,0,SeasideActions.tactician);
Action.tacticianDuration=new Action(1,5,0,1,null);
Action.huntingParty=new Action(1,1,0,0,CornucopiaActions.huntingParty);
Action.harvest=new Action(0,0,0,0,CornucopiaActions.harvest);

Action.countingHouse=new Action(0,0,0,0,ProsperityActions.countingHouse);

/**
 * Bridge
 * Coppersmith
 * Monument
 * Grand Market
 * Peddler
 * Nomad camp
 * Cache
 * Highway
 * Ill-Gotten gains
 * Margrave
 * Bandit camp
 * Candlestick Maker
 * Baker
 * Merchant Guild
 * TODO:Add special treausres.
  *TODO:Add cards with an effect that triggers upon gaining.
 * TODO: Add cards that modify cost.
 * TODO: Add coin token cards.
 * TODO: Add cards that give VP.
 */
//


Action.festival=new Action(2,0,2,1,null);
Action.laboratory=new Action(1,2,0,0,null);
Action.market=new Action(1,1,1,1,null);
Action.bazaar=new Action(2,1,1,0,null);
Action.witch=new Action(0,2,0,0,AttackAction.witch);
Action.soothsayer=new Action(0,0,0,0,AttackAction.soothsayer);
Action.councilRoom=new Action(0,4,0,1,Action.councilRoom);
Action.setupNum=10;
