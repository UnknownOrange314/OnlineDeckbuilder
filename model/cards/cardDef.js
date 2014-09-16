
function CardDef(cardData,cost,name,rules){

    var duration=null;

    var types=Array();
    types.push(cardData);

    this.getRules=function(){
        return rules;
    }

    this.setDuration=function(d){
        duration=d;
    }

    this.addSubtype=function(sub){
        types.push(sub);
    }

    this.getDuration=function(user){
        return duration;
    }

    this.hasDuration=function(){
        return duration!=null;
    }

    //Returns the amount of money a card generates.
    this.getMoney=function(){
        return cardData.getMoney();
    }

    this.setPoints=function(pts){
        points=pts;
    }

    this.getPoints=function(deck){
        return points+cardData.getVP(deck);
    }

    this.getName=function(){
        return name;
    }

    this.getCost=function(){
        return cost;
    }

    this.getMainType=function(){
        return cardData.getMainType();
    }

    this.hasSubtype=function(type){
        var has=false;
        types.forEach(function(subType){
            if(type==subType.getMainType()){
                has=true;
            }
        });
        return has;
    }

    this.setupNum=function(){
        return cardData.setupNum();
    }

    this.getActions=function(){
        if(this.getMainType()==CardDef.Action){
            return cardData.getActions();
        }
        return 0;
    }

    this.getCards=function(){
        if(this.getMainType()==CardDef.Action){
            return cardData.getCards();
        }
        return 0;
    }


    this.getTreasureMoney=function(){
        var money=0;
        types.forEach(function(type){
            if(type.getMainType()==CardDef.Treasure){
                money+=type.getMoney();
            }
        });
        return money;
    }

    this.getVP=function(owner){
        var points=0;
        types.forEach(function(type){
            if(type.getMainType()==CardDef.Victory){
                points+=type.getVP(owner);
            }
        });
        return points;
    }

    this.getMoney=function(){
        return cardData.getMoney();
    }

    this.getBuys=function(){
        return cardData.getBuys();
    }

    this.requiresInput=function(){
        return cardData.requiresInput();
    }

    this.specialRules=function(player,game){
        cardData.specialRules(player,game);
    }

    this.play=function(options,player){
        cardData.inputRules(options,player);
    }

    this.getUI=function(player,cards){
        console.log("Getting UI with cards:"+cards);
        return cardData.inputUI(player,cards);
    }
}


CardDef.Treasure="Treasure";
CardDef.Victory="Victory";
CardDef.Action="Action";
CardDef.Ruins="Ruins";
CardDef.CurseType="Curse";
CardDef.Shelter="Shelter";

CardDef.curse=new CardDef(Curse.curse,0,"Curse");

//Treasure cards.
CardDef.copper=new CardDef(Treasure.copper,0,"Rock");
CardDef.silver=new CardDef(Treasure.silver,3,"Silver");
CardDef.gold=new CardDef(Treasure.gold,6,"Gold");
CardDef.platinum=new CardDef(Treasure.platinum,9,"Diamond");
CardDef.venture=new CardDef(Treasure.venture,5,"Venture");
CardDef.bank=new CardDef(Treasure.bank,7,"Bank");

//Victory cards.
CardDef.estate=new CardDef(Victory.estate,2,"Asteroid");
CardDef.duchy=new CardDef(Victory.duchy,5,"Moon");
CardDef.province=new CardDef(Victory.province,8,"Planet");
CardDef.colony=new CardDef(Victory.colony,11,"Star");

/**
 * A list of action cards.
 */

//Ruins
CardDef.abandonedMine=new CardDef(Action.abandonedMine,0,"Abandoned mine");
CardDef.ruinedLibrary=new CardDef(Action.ruinedLibrary,0,"Ruined library");
CardDef.ruinedMarket=new CardDef(Action.ruinedMarket,0,"Ruined market");
CardDef.ruinedVillage=new CardDef(Action.ruinedVillage,0,"Ruined village");
CardDef.abandonedMine.addSubtype(CardDef.Ruins);
CardDef.ruinedLibrary.addSubtype(CardDef.Ruins);
CardDef.ruinedMarket.addSubtype(CardDef.Ruins);
CardDef.ruinedVillage.addSubtype(CardDef.Ruins);

//Shelters
CardDef.necropolis=new CardDef(Action.necropolis,0,"Necropolis");
CardDef.necropolis.addSubtype(CardDef.Shelter);

//2 cost cards.
CardDef.chapel=new CardDef(Action.chapel,2,"Chapel","Trash up to 4 cards from your hand");
CardDef.lighthouse=new CardDef(Action.lighthouse,2,"Lighthouse");
CardDef.lighthouse.setDuration(Action.lighthouseDuration);
CardDef.crossroads=new CardDef(Action.crossroads,2,"Crossroads");
CardDef.poorHouse=new CardDef(Action.poorHouse,2,"PoorHouse");
CardDef.vagrant=new CardDef(Action.vagrant,2,"Vagrant");

//3 cost cards.
CardDef.village=new CardDef(Action.village,3,"Base");
CardDef.woodcutter=new CardDef(Action.woodcutter,3,"Miner");
CardDef.menagerie=new CardDef(Action.menagerie,3,"Menagerie");
CardDef.fishingVillage=new CardDef(Action.fishingVillage,3,"FishingVillage");
CardDef.fishingVillage.setDuration(Action.fishingVillageDuration);
CardDef.shantyTown=new CardDef(Action.shantyTown,3,"ShantyTown");
CardDef.sage=new CardDef(Action.sage,3,"Sage");
CardDef.greatHall=new CardDef(Action.greatHall,3,"GreatHall");

//4 cost cards.
CardDef.workersVillage=new CardDef(Action.workersVillage,4,"Camp");
CardDef.gardens=new CardDef(Victory.gardens,4,"Gardens");
CardDef.smithy=new CardDef(Action.smithy,4,"Metalworker");
CardDef.seaHag=new CardDef(Action.seaHag,4,"SeaHag");
CardDef.silkRoad=new CardDef(Victory.silkRoad,4,"SilkRoad");
CardDef.feodum=new CardDef(Victory.feodum,4,"Feodum");
CardDef.treasureMap=new CardDef(Action.treasureMap,4,"TreasureMap");
CardDef.caravan=new CardDef(Action.caravan,4,"Caravan");
CardDef.caravan.setDuration(Action.carvanDuration);
CardDef.farmingVillage=new CardDef(Action.farmingVillage,4,"FarmingVillage");
CardDef.cutpurse=new CardDef(Action.cutpurse,4,"Cutpurse");


//5 cost cards.
CardDef.festival=new CardDef(Action.festival,5,"Fair");
CardDef.laboratory=new CardDef(Action.laboratory,5,"Lab");
CardDef.market=new CardDef(Action.market,5,"Store");
CardDef.bazaar=new CardDef(Action.bazaar,5,"Shop");
CardDef.witch=new CardDef(Action.witch,5,"Witch");
CardDef.soothsayer=new CardDef(Action.soothsayer,5,"Soothsayer");
CardDef.duke=new CardDef(Victory.duke,5,"Duke");
CardDef.city=new CardDef(Action.city,5,"City");
CardDef.merchantShip=new CardDef(Action.merchantShip,5,"MerchantShip");
CardDef.merchantShip.setDuration(Action.merchantShip);
CardDef.wharf=new CardDef(Action.wharf,5,"Wharf");
CardDef.wharf.setDuration(Action.wharf);
CardDef.tactician=new CardDef(Action.tactician,5,"Tactician");
CardDef.tactician.setDuration(Action.tacticianDuration);
CardDef.huntingParty=new CardDef(Action.huntingParty,5,"HuntingParty");
CardDef.councilRoom=new CardDef(Action.councilRoom,5,"CouncilRoom");
CardDef.harvest=new CardDef(Action.harvest,5,"Harvest");
CardDef.countingHouse=new CardDef(Action.countingHouse,5,"CountingHouse");

CardDef.adventurer=new CardDef(Action.adventurer,6,"Adventurer");
CardDef.fairgrounds=new CardDef(Victory.fairgrounds,6,"Fairgrounds");
CardDef.harem=new CardDef(Treasure.harem,6,"Harem");
CardDef.harem.setPoints(2);

CardDef.kingdomCards=[CardDef.chapel,
    CardDef.lighthouse,
    CardDef.crossroads,
    CardDef.poorHouse,
    CardDef.vagrant,
    CardDef.village,
    CardDef.woodcutter,
    CardDef.menagerie,
    CardDef.fishingVillage,
    CardDef.shantyTown,
    CardDef.sage,
    CardDef.greatHall,
    CardDef.workersVillage,
    CardDef.gardens,
    CardDef.smithy,
    CardDef.seaHag,
    CardDef.silkRoad,
    CardDef.feodum,
    CardDef.treasureMap,
    CardDef.caravan,
    CardDef.farmingVillage,
    CardDef.cutpurse,
    CardDef.festival,
    CardDef.laboratory,
    CardDef.market,
    CardDef.bazaar,
    CardDef.soothsayer,
    CardDef.duke,
    CardDef.city,
    CardDef.merchantShip,
    CardDef.wharf,
    CardDef.tactician,
    CardDef.huntingParty,
    CardDef.councilRoom,
    CardDef.harvest,
    CardDef.countingHouse,
    CardDef.venture,
    CardDef.adventurer,
    CardDef.fairgrounds,
    CardDef.harem,
    CardDef.venture
    ];