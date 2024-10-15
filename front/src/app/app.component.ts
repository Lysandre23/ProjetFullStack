import { Component } from '@angular/core';
import {UserListComponent} from './components/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent],
  template: `
    <h1>Angular App with Spring Backend</h1>
    <app-user-list></app-user-list>
  `
})
export class AppComponent {}
