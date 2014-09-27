
function CardDef(cardData,cost,name,rules){

    var duration=null;
    var types=Array();
    var points=0;
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

    this.hasType=function(type){
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
        return cardData.inputUI(player,cards);
    }
}



CardDef.Treasure="Treasure";
CardDef.Victory="Victory";
CardDef.Action="Action";
CardDef.Ruins="Ruins";
CardDef.CurseType="Curse";
CardDef.Shelter="Shelter";
CardDef.Kingdom="Kingdom";

function KingdomCard(){
    this.getMainType=function(){
        return CardDef.Kingdom;
    }
}

CardDef.curse=new CardDef(Curse.curse,0,"Curse");

//Treasure cards.
CardDef.copper=new CardDef(Treasure.copper,0,"Pence");
CardDef.silver=new CardDef(Treasure.silver,3,"Shilling");
CardDef.gold=new CardDef(Treasure.gold,6,"Pound");
CardDef.platinum=new CardDef(Treasure.platinum,9,"Diamond");
CardDef.venture=new CardDef(Treasure.venture,5,"Stock",
    "Reveal cards until you reveal a Treasure. Play that treasure");
CardDef.bank=new CardDef(Treasure.bank,7,"Bank",
    "Worth 1 per treasure card you have in play(counting this)");

//Victory cards.
CardDef.estate=new CardDef(Victory.estate,2,"Settlement");
CardDef.duchy=new CardDef(Victory.duchy,5,"District");
CardDef.province=new CardDef(Victory.province,8,"State");
CardDef.VP4="Nation";
CardDef.colony=new CardDef(Victory.colony,11,CardDef.VP4);

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
CardDef.chapel=new CardDef(Action.chapel,2,"Church","Scrap up to 4 cards from your hand.");

CardDef.lighthouse=new CardDef(Action.lighthouse,2,"Beacon",
"At the start of your next turn +$1. When this is in play, when another player plays an Attack card, it doesn't affect you.");
CardDef.lighthouse.setDuration(Action.lighthouseDuration);

CardDef.crossroads=new CardDef(Action.crossroads,2,"Intersection",
"+1 card per victory card in your hand. If this is the first time you played an intersection this turn, +3 actions.");

CardDef.poorHouse=new CardDef(Action.poorHouse,2,"Hut",
"-$1 per Treasure card in your hand, to a minimum of $0.");

CardDef.vagrant=new CardDef(Action.vagrant,2,"Vagabond",
"Reveal the top card of your deck. If it's a curse, ruins, shelter, or victory card, put it in your hand.");

//3 cost cards.
CardDef.village=new CardDef(Action.village,3,"Base");
CardDef.woodcutter=new CardDef(Action.woodcutter,3,"Miner");
CardDef.menagerie=new CardDef(Action.menagerie,3,"Zoo",
"If there are no duplicate cards in your hand, +3 cards, otherwise +1 card.");

CardDef.fishingVillage=new CardDef(Action.fishingVillage,3,"Fisherman",
"At the start of your next turn +1 action, +$1");
CardDef.fishingVillage.setDuration(Action.fishingVillageDuration);

CardDef.shantyTown=new CardDef(Action.shantyTown,3,"Slum",
"Reveal your hand, if you have no action cards in hand, +2 cards");

CardDef.sage=new CardDef(Action.sage,3,"Shaman",
"Reveal cards from the top of your deck until you reveal one costing +$3 or more. Put the card into your hand and discard the rest.");

CardDef.greatHall=new CardDef(Action.greatHall,3,"MeetingHall");

//4 cost cards.
CardDef.moneylender=new CardDef(Action.moneylender,4,"Usurer",
"Scrap a copper card from your hand, if you do, +$1");

CardDef.workersVillage=new CardDef(Action.workersVillage,4,"Camp");

CardDef.gardens=new CardDef(Victory.gardens,4,"Park",
"Worth 1VP for every 10 cards in your deck(rounded down).");

CardDef.smithy=new CardDef(Action.smithy,4,"Metalworker");

CardDef.seaHag=new CardDef(Action.seaHag,4,"OceanWitch",
"Each other player discards the top card of his deck, then gains a curse card, putting it on top of his deck.");

CardDef.silkRoad=new CardDef(Victory.silkRoad,4,"TradingCompany",
"Worth 1VP for every 4 victory cards in your deck(rounded down).");

CardDef.feodum=new CardDef(Victory.feodum,4,"MoneyHouse",
"Worth 1VP for every 3 silvers in your deck(rounded down).");

CardDef.treasureMap=new CardDef(Action.treasureMap,4,"Atlas",
"Scrap this and another copy of Atlas from your hand. If you do, gain 4 Gold cards, putting them on top of your deck.");

CardDef.caravan=new CardDef(Action.caravan,4,"Convoy",
"At the start of your next turn, +1 spell");
CardDef.caravan.setDuration(Action.carvanDuration);

CardDef.farmingVillage=new CardDef(Action.farmingVillage,4,"Farm",
"Reveal cards from the top of your deck until you reveal an action or treasure spell. Put that card into your hand and discard the other cards.");

CardDef.cutpurse=new CardDef(Action.cutpurse,4,"Pickpocket",
"Each player discards a pence, or reveals a hand with no pence.");


//5 cost cards.
CardDef.festival=new CardDef(Action.festival,5,"Fair");
CardDef.laboratory=new CardDef(Action.laboratory,5,"Scientist");
CardDef.market=new CardDef(Action.market,5,"Store");
CardDef.bazaar=new CardDef(Action.bazaar,5,"Shop");

CardDef.witch=new CardDef(Action.witch,5,"Sorcerer","Each other player gains a curse spell.");

CardDef.soothsayer=new CardDef(Action.soothsayer,5,"Psychic",
"Gain a Gold. Each other player gains a curse. Each player who did draws a spell.");

CardDef.duke=new CardDef(Victory.duke,5,"Priest",
"Worth 1VP per Duchy you have");

CardDef.city=new CardDef(Action.city,5,"Town",
"If there are one or more empty supply piles, +1 spell. If there are two or more +$1, and +1 purchase.");

CardDef.merchantShip=new CardDef(Action.merchantShip,5,"TradeBoat",
"At the start of your next turn +$2");
CardDef.merchantShip.setDuration(Action.merchantShip);

CardDef.wharf=new CardDef(Action.wharf,5,"Pier",
"At the start of your next turn +2 spells, +1 buy.");
CardDef.wharf.setDuration(Action.wharf);

CardDef.tactician=new CardDef(Action.tactician,5,"Strategist",
"Discard your hand. If you discarded any spells this way, then at the start of your next turn, +5 spells,+1 purchase, +1 mana.");
CardDef.tactician.setDuration(Action.tacticianDuration);

CardDef.huntingParty=new CardDef(Action.huntingParty,5,"Hunters",
"Reveal your hand. Reveal cards from your deck until you reveal a spell that isn't a duplicate of one in your hand. Put it into your hand and discard the rest");

CardDef.councilRoom=new CardDef(Action.councilRoom,5,"Assembly",
"Each other player draws a spell");

CardDef.harvest=new CardDef(Action.harvest,5,"Reaping",
"Reveal the top 4 spells of your deck, then discard them. +$1" +
    "per differently named card revealed");

CardDef.countingHouse=new CardDef(Action.countingHouse,5,"AccountOffice",
"Place all copper spell from your discard pile into your hand.");

CardDef.adventurer=new CardDef(Action.adventurer,6,"TradingCompany",
"Reveal spells from your deck until you reveal 2 treasure spells. Put those treasure cards from your hand and discard the other revealed cards.");

CardDef.fairgrounds=new CardDef(Victory.fairgrounds,6,"Carnival",
"Worth 2 for every 5 differently named cards in your deck(rounded down).");

CardDef.harem=new CardDef(Treasure.harem,6,"Plantation");
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
    CardDef.moneylender,
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