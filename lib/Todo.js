
import performer from '/lib/request.js';

export class Todo {

    // funcion estatica para llamar todos los todos
    static async all(){

        // performer es uan funcion importada donde se encuentran
        // las llamadas a la API
        let todos = await performer({
            type: "listAll"
        })

        // console.log(todos)
        
        return todos.map( todoJSON => new Todo(todoJSON))
    }

    save = async () => {
        
        if(this.id) return this.update();

        this.create();
    }

    create = async () =>{
        let response = await performer({
            type: "create",
            payload:{
                title: this.title
            }
        }).than(data => this.id = data.id);

        return response;
    }

    update = async () =>{
        let responde = await performer({
            type: "update",
            payload:{
                id: this.id,
                title: this.title
            }
        });

        return responde;
    }

    destroy = async () => {
        let responde = await performer({
            type: "destroy",
            payload:{
                id: this.id
            }
        });

        return responde;
    }

    constructor(args){
        this.user = args.userId;
        this.title = args.title;
        this.completed = args.completed;
        this.id = args.id;
    }
}