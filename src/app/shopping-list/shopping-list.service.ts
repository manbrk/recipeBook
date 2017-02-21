import {Ingridient} from "../shared/ingridient";
export class ShoppingListService {
  private items: Ingridient[] = [];

  constructor() { }

  getItems() {
      return this.items;
  }

  addItems(items: Ingridient[]) {
      Array.prototype.push.apply(this.items, items);
  }

  addItem(item: Ingridient) {
      this.items.push(item);
  }
}
