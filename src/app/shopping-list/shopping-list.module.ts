import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingListAddComponent} from "./shopping-list-add.component";

@NgModule({
    declarations: [ShoppingListComponent, ShoppingListAddComponent],
    imports: [FormsModule, CommonModule]
})
export class ShoppingListModule {}
