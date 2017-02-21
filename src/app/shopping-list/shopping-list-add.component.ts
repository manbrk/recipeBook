import { Component, OnInit } from '@angular/core';
import {Ingridient} from "../shared/ingridient";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnInit {
  item: Ingridient;
  isAdd = true;

  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
  }

  onSubmit(ingridient: Ingridient) {
    if (!this.isAdd) {
      // Edit
    } else {
      this.item = new Ingridient(ingridient.name, ingridient.amount);
      this.sls.addItem(this.item);
    }
  }
}
