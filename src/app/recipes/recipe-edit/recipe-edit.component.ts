import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
                private formBuilder: FormBuilder,
                private router: Router) {
    }

    ngOnInit() {
        // let isNew = true;
        this.subscription = this.route.params.subscribe(
            (params: any) => {
                if (params.hasOwnProperty('id')) {
                    this.isNew = false;
                    this.recipeIndex = +params['id'];
                    this.recipe = this.recipeService.getRecipe(this.recipeIndex);
                } else {
                    this.isNew = true;
                    this.recipe = null;
                }
                this.initForm();
            }
        );
    }

    onSubmit() {
        const newRecipe = this.recipeForm.value;
        if (this.isNew) {
            this.recipeService.addRecipe(newRecipe);
        } else {
            this.recipeService.editRecipe(this.recipe, newRecipe);
        }
        this.navigateBack();
    }

    onCancel() {
        this.navigateBack();
    }

    onAddItem(name: string, amount: string) {
        (<FormArray>this.recipeForm.controls['ingridients']).push(
            new FormGroup({
                name: new FormControl(name, Validators.required),
                amount: new FormControl(amount, [
                    Validators.required,
                    Validators.pattern("\\d+")
                ])
            })
        );
    }

    onRemoveItem(index: number) {
        (<FormArray>this.recipeForm.controls['ingridients']).removeAt(index);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private navigateBack() {
        this.router.navigate(['../']);
    }

    private initForm() {
        let recipeName = '';
        let recipeImageUrl = '';
        let recipeContent = '';
        let recipeIngridients: FormArray = new FormArray([]);

        if (!this.isNew) {
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
