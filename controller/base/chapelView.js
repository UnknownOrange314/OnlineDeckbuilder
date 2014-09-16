function ChapelView(){

}

ChapelView.playInstructions=function(){
    alert("Trash up to 4 cards from your hand");
}

ChapelView.chapelUI=function(user,cards){
    var data=Array();
    console.log("Selected cards:"+JSON.stringify(cards));
    user.getHand().forEach(function(card){
        var cData={};
        cData["id"]=card.getID();
        cData["name"]=card.getName();
        if(cards.indexOf(card.getID())!=-1){
            cData["selected"]=true;
        }else{
            cData["selected"]=false;
        }
        data.push(cData);
    });
    console.log(JSON.stringify(data));
    return data;
}
