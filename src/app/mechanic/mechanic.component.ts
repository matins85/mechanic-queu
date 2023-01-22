import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { addCar } from '../shared/form';

@Component({
  selector: 'app-mechanic',
  templateUrl: './mechanic.component.html',
  styleUrls: ['./mechanic.component.scss']
})
export class MechanicComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: addCar;
  display: boolean = false;
  current: any = {
    name: 'Moses Adejo',
    phone: '08345346643',
    id: 1,
    color: 'pink',
    model: 'camry'
  };
  active = 1;
  total = 0;
  time = 60;
  cars = [
    {
      name: 'Adejo Emmanuel',
      id: 2,
      phone: '080422332733',
      model: 'Toyota',
      color: 'black'
    },
    {
      name: 'Adejo Emmanuel',
      id: 3,
      phone: '080422332733',
      model: 'Toyota',
      color: 'red'
    },
    {
      name: 'Adejo Emmanuel',
      id: 4,
      phone: '080422332733',
      model: 'Toyota',
      color: 'green'
    },
    {
      name: 'Adejo Emmanuel',
      id: 5,
      phone: '080422332733',
      model: 'Toyota',
      color: 'orange'
    }
  ];

  formErrors: any = {
    name: '',
    phone: '',
    model: '',
    color: ''
  };

  validationMessages: any = {
    name: {
      required: 'required.'
    },
    phone: {
      required: 'required.'
    },
    color: {
      required: 'required.'
    },
    model: {
      required: 'required.'
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  serveNext() {
    this.active += 1;
    if (this.cars.length == 0 && !this.current) {
      this.active = 0;
      this.time = 0;
      this.current = undefined;
    } else {
      this.current = this.cars[0];
      this.time = 60;
      this.total += 1;
      this.cars.shift();
    }
  }

  setTime() {
    setTimeout(() => {
      if (this.time < 1) {
        this.serveNext();
      } else {
        if (this.cars?.length == 0 && !this.current) {
          this.active = 0;
          this.time = 0;
        } else {
          this.time -= 1;
        }
      }
      this.setTime();
    }, 1000);
  }

  // create form
  createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      model: ['', [Validators.required]],
      color: ['', [Validators.required]]
    });

    this.feedbackForm.valueChanges.subscribe((data: any) =>
      this.onValueChanged(data)
    );
    this.onValueChanged(); // (re)set validation messages now
  }

  // check for errors in form
  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = messages[key];
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.onValueChanged();
    const feed = this.feedbackFormDirective.invalid;
    if (feed) {
    } else {
      this.feedback = this.feedbackForm.value;
      if (this.cars?.length == 0 && !this.current) {
        const get_id = this.cars?.length;
        this.current = {
          name: this.feedback.name,
          phone: this.feedback.phone,
          id: get_id + 1,
          color: this.feedback.color.toLowerCase(),
          model: this.feedback.model
        };
        this.active += 1;
        this.time = 60;
      } else {
        const get_id = this.cars?.length - 1;
        this.cars.push({
          name: this.feedback.name,
          phone: this.feedback.phone,
          id: this.cars[get_id]?.id + 1 || 2,
          color: this.feedback.color.toLowerCase(),
          model: this.feedback.model
        });
      }
      // remove dialog
      this.display = false;
      // clear form
      this.feedbackFormDirective.resetForm();
    }
  }

  // display dialog box
  showDialog() {
    this.display = true;
  }

  // remove dialog box
  cancel() {
    this.display = false;
  }

  ngOnInit(): void {
    this.setTime();
  }
}
