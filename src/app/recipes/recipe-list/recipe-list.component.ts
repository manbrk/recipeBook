import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe";

@Component({
    selector: 'rb-recipe-list',
    templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [];
    recipe = new Recipe('Dummy', 'Dummy', 'http://мини-манекен.рф/1373-thickbox_default/statuetka-mini-maneken-dlya-fantazij-bezhevyij.jpg');

    constructor() {
    }

    ngOnInit() {
    }

}
