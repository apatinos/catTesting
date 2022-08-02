export class CatDto {
    name: string;
    breed: string;
    age: number;

    constructor(name:string, breed:string, age: number){
        this.name = name;
        this.breed = breed;
        this.age = age;
    }
}
