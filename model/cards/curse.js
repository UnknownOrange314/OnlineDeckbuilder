function Curse(pts){
    var points=pts;
    this.getVP=function(){
        return points;
    }
    this.getMainType=function(){
        return CardDef.CurseType;
    }
}

Curse.curse=new Curse(-1);
