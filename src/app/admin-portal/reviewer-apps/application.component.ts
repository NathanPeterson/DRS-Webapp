import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})

export class ApplicationComponent{
  @Input() application;

  @Output() delete = new EventEmitter();

  onDelete(){
    this.delete.emit(this.application);
  }
}
