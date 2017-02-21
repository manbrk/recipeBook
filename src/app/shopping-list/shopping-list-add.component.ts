import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {Ingridient} from "../shared/ingridient";
import {ShoppingListService} from "./shopping-list.service";

@Component({
    selector: 'rb-shopping-list-add',
    templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnChanges {
    @Input() item: Ingridient;
    @Output() cleared = new EventEmitter();
    isAdd = true;

    constructor(private sls: ShoppingListService) {
    }

    ngOnChanges(changes) {
        if (changes.item.currentValue === null) {
            this.isAdd = true;
            this.item = {name: null, amount: null};
        } else {
            this.isAdd = false;
        }
    }

    onSubmit(ingridient: Ingridient) {
        const newIngridient = new Ingridient(ingridient.name, ingridient.amount);
        if (!this.isAdd) {
            this.sls.editItem(this.item, newIngridient);
            this.onClear();
        } else {
            this.item = newIngridient;
            this.sls.addItem(this.item);
        }
    }

    onDelete() {
        this.sls.deleteItem(this.item);
        this.onClear();
    }

    onClear() {
        this.isAdd = true;
        this.cleared.emit(null);
    }
}
