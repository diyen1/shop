import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-cell',
  templateUrl: './yes-no-cell.component.html',
  styleUrls: ['./yes-no-cell.component.scss']
})
export class YesNoCellComponent implements OnInit {

  @Input() value: any;
  @Input() rowData: any;
  formattedValue = '';

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.formattedValue = (!!this.value || this.value === 'true') ? 'Yes' : 'No';
  }
}
