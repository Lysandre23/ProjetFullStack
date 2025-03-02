import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdminEditModule } from './admin-edit/admin-edit.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AdminEditModule],
  bootstrap: [AppComponent],
})
export class AppModule {} 