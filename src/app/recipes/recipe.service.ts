import {Injectable, EventEmitter} from '@angular/core';
import {Headers, Http, Response} from "@angular/http";
import 'rxjs/Rx'

import {Recipe} from "./recipe";
import {Ingridient} from "../shared/ingridient";

@Injectable()
export class RecipeService {
    recipesChanged = new EventEmitter<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Schnitzel', 'Very tasty', 'http://www.bbcgoodfood.com/sites/default/files/styles/carousel_small/public/recipe/recipe-image/2016/03/chicken-schnitzel-strips-with-tomato-spaghetti.jpg?itok=3r23piTE', [
            new Ingridient('French Fries', 2),
            new Ingridient('Pork Meat', 1)
        ]),
        new Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])
    ];

  constructor(private http: Http) { }

  getRecipes() {
      return this.recipes;
  }

  getRecipe(id: number) {
      return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
      this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
      this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
      const body = JSON.stringify(this.recipes);
      const headers = new Headers({
          'Content-Type': 'application/json'
      });
      return this.http.put('https://recipebook-47308.firebaseio.com/recipes.json', body, {headers: headers});
  }

  fetchData() {
      return this.http.get('https://recipebook-47308.firebaseio.com/recipes.json')
          .map((response: Response) => response.json())
          .subscribe(
              (data: Recipe[]) => {
                  this.recipes = data;
                  this.recipesChanged.emit(this.recipes);
              }
          );

  }
}
