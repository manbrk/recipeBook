import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs/Rx";
import {Recipe} from "../recipe";
import {FormArray, FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";

@Component({
    selector: 'rb-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styles: []
})
export class RecipeEditComponent implements OnInit, OnDestroy {
    recipeForm: FormGroup;
    private recipeIndex: number;
    private recipe: Recipe;
    private isNew = true;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute,
                private recipeService: RecipeService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        let isNew = true;
        this.subscription = this.route.params.subscribe(
            (params: any) => {
                if (params.hasOwnProperty('id')) {
                    isNew = false;
                    this.recipeIndex = +params['id'];
                    this.recipe = this.recipeService.getRecipe(this.recipeIndex);
                } else {
                    isNew = true;
                    this.recipe = null;
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private initForm(isNew: boolean) {
        let recipeName = '';
        let recipeImageUrl = '';
        let recipeContent = '';
        let recipeIngridients: FormArray = new FormArray([]);

        if (!isNew) {
            for (let i = 0; i < this.recipe.ingridients.length; i++) {
                recipeIngridients.push(
                    new FormGroup({
                        name: new FormControl(this.recipe.ingridients[i].name, Validators.required),
                        amount: new FormControl(this.recipe.ingridients[i].amount, [
                            Validators.required,
                            Validators.pattern("\\d+")
                        ])
                    })
                );
            }
            recipeName = this.recipe.name;
            recipeImageUrl = this.recipe.imagePath;
            recipeContent = this.recipe.description;
        }

        this.recipeForm = this.formBuilder.group({
            name: [recipeName, Validators.required],
            imagePath: [recipeImageUrl, Validators.required],
            description: [recipeContent, Validators.required],
            ingridients: recipeIngridients
        });
    }
}
