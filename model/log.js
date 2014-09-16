function Log(){
    var max=10;
    var data=[];

    this.push=function(message){
        if(data.length==max){
            data=data.slice(1);
        }
        data.push(message);
    }

    this.toArray=function(){
        return data;
    }

    this.clear=function(){
        data=[];
    }
}
