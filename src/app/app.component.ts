import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'observable playground app';
  public isVisible = false;

  showComponents() {
    this.isVisible = true;
  }
}
