function ChapelView(){

}

ChapelView.playInstructions=function(){
    alert("Trash up to 4 cards from your hand");
}

ChapelView.chapelUI=function(user,cards){
    var data=Array();
    user.getHand().forEach(function(card){
        var cData=Render.getCardRender(card);
        if(cards.indexOf(card.getID())!=-1){
            cData["selected"]=true;
        }else{
            cData["selected"]=false;
        }
        data.push(cData);
    });
    return data;
}
