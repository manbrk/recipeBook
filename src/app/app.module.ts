import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import {RecipeService} from "./recipes/recipe.service";
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {routes} from "./app.routing";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {CoreModule} from "./core.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routes,
    ShoppingListModule,
    CoreModule
  ],
  providers: [RecipeService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
