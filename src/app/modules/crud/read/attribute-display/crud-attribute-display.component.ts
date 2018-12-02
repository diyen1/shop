import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CrudField} from '../../crud-field';

@Component({
  selector: 'crud-attribute-display',
  templateUrl: './crud-attribute-display.component.html',
  styleUrls: ['./crud-attribute-display.component.scss']
})
export class CrudAttributeDisplayComponent implements OnInit, OnChanges {

  @Input() fields: CrudField[] = [];

  @Input() submitButtonText = 'Submit';

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
