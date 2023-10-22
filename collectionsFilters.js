export default class CollectionFilter{

    constructor(obj,params,model) {
        this.objectsList = obj;
        this.params = params;
        this.model = model;
        //console.log(this.objectsList);
        console.log(this.params);
        //console.log(this.model);
        
    }



      Filter(){
        if(this.params == null){
            return this.objectsList;
        }
        
        if(this.params.Category != undefined){
            this.objectsList = this.objectsList.filter(b => b.Category.toLowerCase() == this.params.Category.toLowerCase());
            
        }    
        if(this.params.field != undefined){
            let data = [];
            this.objectsList.forEach(element => {
                data.push(element[`${this.params.field}`]);
            });
                        
            this.objectsList = data.filter((value,index) => data.indexOf(value) === index);
        }
        if(this.params.sort != undefined){
        
            this.objectsList = this.objectsList.sort((a,b) => a[`${this.params.sort}`] > b[`${this.params.sort}`] ? 1 : -1);
            
        }
        return this.objectsList;
    }
    


}