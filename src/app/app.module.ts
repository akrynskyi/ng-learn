import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FocusDirective } from './directives/focus.directive';
import { HoverDirective } from './directives/hover.directive';
import { HideDirective } from './directives/hide.directive';

@NgModule({
  declarations: [
    AppComponent,
    FocusDirective,
    HoverDirective,
    HideDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
