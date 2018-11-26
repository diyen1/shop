import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CrudField} from '../../crud-field';

@Component({
  selector: 'app-crud-read-single',
  templateUrl: './crud-read-single.component.html',
  styleUrls: ['./crud-read-single.component.css']
})
export class CrudReadSingleComponent implements OnInit, OnChanges {

  form: any;

  @Input() fields: CrudField[] = [];

  @Input() submitButtonText = 'Submit';

  @Output() outputData: any = new EventEmitter<any>();

  controlsConfig = {};

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initializeForm();
  }

  initializeForm(): void {

    console.log('this.fields', this.fields);

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];

      if (field.type === 'image_array') {

        const imageCount = field.image_count;

        for (i = 0; i < imageCount; i++) {
          let value = '';
          if (field.value && field.value[i]) {
            value = field.value[i];
          }
          console.log(field.type + ' value', value);
          this.controlsConfig[field.key + '_' + i] = [value];
        }
      } else {
        const value = field.value || '';
        console.log(field.type + ' value: ', value);
        this.controlsConfig[field.key] = [value, Validators.required];
      }
    }

    console.log(this.controlsConfig);

    /*this.form = this.fb.group({
      fullNames: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      homePhone: ['', Validators.required],
      town: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });*/

    this.form = this.fb.group(this.controlsConfig);
  }

  onSubmit(formData) {
    console.log(formData);

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];

      if (field.type === 'image_array') {
        const imageCount = field.image_count;
        formData[field.key] = [];
        for (i = 0; i < imageCount; i++) {
          if (formData[field.key + '_' + i] !== '') {
            formData[field.key].push(formData[field.key + '_' + i]);
          }
          delete formData[field.key + '_' + i];
        }
      }
    }
    this.outputData.emit(formData);
  }

  fileAddedCallback() {
    console.log('file added callback');
  }

}
