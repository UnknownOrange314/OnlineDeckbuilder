function Card(data){
    this.data=data;
    this.ID=Card.num; //This is a unique identifier for the card
    this.owner=null;
    Card.num++;
}

Card.prototype.getRules=function(){
    return this.data.getRules();
}

Card.prototype.hasType=function(type){
    return this.data.hasType(type);
}
Card.prototype.getMainType=function(){
    return this.data.getMainType();
}

Card.prototype.getName=function(){
    return this.data.getName();
}

Card.prototype.sameCard=function(other){
    return (this.data.getName()===(other.data.getName()));
}

Card.prototype.getID=function(){
    return this.ID;
}

Card.prototype.getCost=function(){
    return this.data.getCost();
}

Card.prototype.setOwner=function(own){
    this.owner=own;
}

Card.prototype.getTreasureMoney=function(){
    return this.data.getTreasureMoney();
}

/**
 * This returns the number of VP the card is worth.
 */
Card.prototype.getVP=function(deck){
    return this.data.getPoints(deck);
}

Card.prototype.getActions=function(){
    return this.data.getActions();
}

Card.prototype.getBuys=function(){
    return this.data.getBuys();
}

Card.prototype.getCards=function(){
    return this.data.getCards();
}

Card.prototype.getMoney=function(){
    return this.data.getMoney();
}

Card.prototype.getData=function(){
    return this.data;
}

Card.prototype.getVP=function(){
    return this.data.getVP(this.owner);
}

//What will be displayed on the card when it is in a player's hand.
Card.prototype.cardInfo=function(){
    var info=this.data.getName()+'\n';
    if(this.getMainType()==CardDef.Treasure){
        info+="$"+this.data.getMoney()+"   ";
    }if(this.getMainType()==CardDef.Victory){
        info+=this.data.getPoints()+'VP'+"   ";
    }
    info+="Cost:"+this.getCost();
    return info;

}

//Does the card require additional input from the player after being played?
Card.prototype.requiresInput=function(){
    return this.data.requiresInput();
}

//Returns data to define the user interface that is necessary when the card is played
Card.prototype.getUI=function(player,cardSelect){
    return this.data.getUI(player,cardSelect);
}

/**
 * Resolves special rules for a card.
 * @param player
 * @param game
 */
Card.prototype.specialRules=function(player,game){
    this.data.specialRules(player,game);
}


Card.prototype.play=function(selections,player){
    this.data.play(selections,player);
}

Card.prototype.hasDuration=function(){
    return this.data.hasDuration();
}

Card.prototype.getDuration=function(){
    return this.data.getDuration();
}

Card.prototype.getRules=function(){
    return this.data.getRules();
}

Card.num=0; //This is a running count of the total number of cards. It is used to generate unique IDs for the cards.