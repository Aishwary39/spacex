import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LaunchListComponent } from './components/launch-list/launch-list.component';
import { RouterModule, Routes } from '@angular/router';

var routes : Routes = [
  {
    path : '', redirectTo : 'space-programs', pathMatch : 'full'
  },
  {
    path : 'space-programs' , component : LaunchListComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LaunchListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
