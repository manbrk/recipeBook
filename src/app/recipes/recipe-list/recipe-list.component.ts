import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../recipe";

@Component({
    selector: 'rb-recipe-list',
    templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [
        new Recipe('Schnitzel', 'Very tasty', 'http://www.bbcgoodfood.com/sites/default/files/styles/carousel_small/public/recipe/recipe-image/2016/03/chicken-schnitzel-strips-with-tomato-spaghetti.jpg?itok=3r23piTE', []),
        new Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])
    ];
    @Output() recipeSelected = new EventEmitter<Recipe>();

    constructor() {
    }

    ngOnInit() {
    }

    onSelected(recipe: Recipe) {
        this.recipeSelected.emit(recipe);

    }

}
