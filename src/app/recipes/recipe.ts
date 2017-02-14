import {Ingridient} from "../shared/ingridient";
export class Recipe {
    constructor(public name, public description, public imagePath, public ingridients: Ingridient[]
    ) {}
}
