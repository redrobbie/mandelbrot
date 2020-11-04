import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-mandelpic',
  templateUrl: './mandelpic.component.html',
  styleUrls: ['./mandelpic.component.css']
})
export class MandelpicComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  
  
  static ctx: CanvasRenderingContext2D;
  static mandel: MandelPlot;

  constructor() { }

  ngOnInit(): void {
    MandelpicComponent.ctx = this.canvas.nativeElement.getContext('2d');
    MandelpicComponent.mandel = new MandelPlot()
    MandelpicComponent.mandel.iterate(-0.5, 0.0, 2.0, 512);
  }

}
export class PlotPixel {
  constructor(private ctx: CanvasRenderingContext2D) {}

  plot(x: number, y: number, col: number) {
    this.ctx.fillStyle = this.toHex(col);
    this.ctx.fillRect(x, y, 1, 1);
  }
  toHex(c: number) {
    // return '#' + col.toString(16) + col.toString(16) + col.toString(16);
    var r: number, g: number, b: number, t: number;

    c = (c & 255);

    t = (c & 192) / 64;
    b = (c & 48) / 16;
    g = (c & 12) / 4;
    r = (c & 3);

    const rawString = (r * 4194304 + g * 16384 + b * 64 + t * 1052688);
    var hexString = '#' + rawString.toString(16).padStart(6, '0');
    // const pad = 6 - hexString.length;
    return hexString;
  }
}
export class MandelPlot {
  iterate(x: number, y: number, s: number, n: number) {
    const pixel = new PlotPixel(MandelpicComponent.ctx);
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {
      var x0 = x - s/2 + s*i/n;
      var y0 = y - s/2 + s*j/n;
      var z = new Complex();
      z.setRe(x0);
      z.setIm(y0);
      var col = this.mand(z, 256);
      pixel.plot(i, j, col);
    }
  }
  }
  mand(z0: Complex, max: number) {
    var z = new Complex();
    z.setRe(z0.getRe());
    z.setIm(z0.getIm());
    for(let t = 0; t < 256; t++) {
      if(Complex.abs(z) > 2.0) {
        return t;
      }
      z.mult(z);
      z.add(z0);
    }
    return max;
  }
}
export class Complex {
  re: number;
  im: number;
  constructor() {
  }
  add(z: Complex) {
    this.re += z.re;
    this.im += z.im;
  }
  mult(z: Complex) {
    var tri: number;
    var tim: number;
    tri = this.re * z.re - this.im * z.im;
    tim = this.re * z.im + this.im * z.re;
    this.re = tri;
    this.im = tim;
  }
  static abs(z: Complex) {
    var absolute = Math.sqrt(z.re * z.re + z.im * z.im);
    return absolute;
  }
  //copy() {
   // return new Complex(this.re, this.im);
  //}
  setRe(r: number) {
    this.re = r;
  }
  setIm(i: number) {
    this.im = i;
  }
  getRe() {
    return this.re;
  }
  getIm() {
    return this.im;
  }
}
