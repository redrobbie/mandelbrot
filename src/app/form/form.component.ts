import { Component, OnInit } from '@angular/core';
import { MandelpicComponent } from '../mandelpic/mandelpic.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClickMe(x: HTMLInputElement, y: HTMLInputElement, s: HTMLInputElement) {
    const xv = parseFloat(x.value);
    const yv = parseFloat(y.value);
    const sv = parseFloat(s.value);
    MandelpicComponent.mandel.iterate(xv, yv, sv, 512);
  }
}

