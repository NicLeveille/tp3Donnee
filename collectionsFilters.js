export default class CollectionFilter {

    constructor(obj, params, model) {
        this.objectsList = obj;
        this.params = params;
        this.model = model;
        //console.log(this.objectsList);
        console.log(this.params);
        //console.log(this.model);

    }



    Filter() {
        if (this.params == null) {
            return this.objectsList;
        }

        if (this.params.Category != undefined) {
            console.log(this.params.Category);
            this.objectsList = this.objectsList.filter(b => b.Category.toLowerCase() == this.params.Category.toLowerCase());

        }
        if (this.params.field != undefined) {
            let fields = this.params.field.split(',');
            console.log(fields);
            let data = [];
            fields.forEach(element =>{
                this.objectsList.forEach(e => {
                    data.push(e[`${element}`]);
                });
            });
            

            this.objectsList = data.filter((value, index) => data.indexOf(value) === index);
        }

        if (this.params.Title != undefined) {
            this.filterName("Title", this.params.Title)
        }

        if (this.params.limit != undefined && this.params.offset != undefined) {

            //Sort les items selon l'id
            this.objectsList = this.objectsList.sort((a,b) => a["Id"] > b["Id"] ? 1 : -1);
            //Prend tout les id apres l'offsett donne
            this.objectsList = this.objectsList.slice(this.params.offset);
            //Prend le nombre d'item donne en partant du premier
            this.objectsList.length = this.objectsList.length - (this.objectsList.length - this.params.limit);
        }

        if (this.params.sort != undefined) {
            if (this.params.sort.endsWith("desc")) {
                let sortType = this.params.sort.replace(",desc","");
                this.objectsList = this.objectsList.sort((a, b) => a[`${sortType}`] > b[`${sortType}`] ? 1 : -1);
                this.objectsList.reverse();
            }
            else if(this.params.sort.endsWith("asc")){
                let sortType = this.params.sort.replace(",asc","");
                this.objectsList = this.objectsList.sort((a, b) => a[`${sortType}`] > b[`${sortType}`] ? 1 : -1);
            }
            else{
                this.objectsList = this.objectsList.sort((a, b) => a[`${this.params.sort}`] > b[`${this.params.sort}`] ? 1 : -1);
            }

            

        }
        return this.objectsList;
    }
    filterName(type, filters) {

        console.log(type);
        console.log(filters);
        if (filters.charAt(filters.length - 1) == "*" && filters.charAt(0) == "*") {

            let searchValue = filters.substring(1, filters.length - 1);

            this.objectsList = this.objectsList.filter(b => b[`${type}`].toLowerCase().includes(searchValue.toLowerCase()));
        }
        else if (filters.charAt(filters.length - 1) == "*") {
            let searchValue = filters.slice(0, -1);
            this.objectsList = this.objectsList.filter(b => b[`${type}`].toLowerCase().startsWith(searchValue.toLowerCase()));
        }
        else if (filters.charAt(0) == "*") {

            let searchValue = filters.slice(1);
            console.log(searchValue);
            this.objectsList = this.objectsList.filter(b => b[`${type}`].toLowerCase().endsWith(searchValue.toLowerCase()));
        }
        else {
            this.objectsList = this.objectsList.filter(b => b[`${type}`].toLowerCase() == filters.toLowerCase())
        }

    }


}