import { Component, OnInit } from '@angular/core';
import {Ingridient} from "../shared/ingridient";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit {
    items: Ingridient[] = [];
    selectedItem: Ingridient = null;

  constructor(private sls: ShoppingListService) { }

  ngOnInit() {
    this.items = this.sls.getItems();
  }

  onSelectItem(item: Ingridient) {
    this.selectedItem = item;
  }

}
