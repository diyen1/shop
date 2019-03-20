import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-cell',
  templateUrl: './date-cell.component.html',
  styleUrls: ['./date-cell.component.css']
})
export class DateCellComponent implements OnInit {

  @Input() value: any;
  @Input() rowData: any;
  formattedDate = '';

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.value && this.value.seconds) {
      this.formattedDate = new Date(this.value.seconds).toLocaleString();
      if (this.formattedDate === 'Invalid Date') {
        this.formattedDate = '';
      }
    }
  }
}
