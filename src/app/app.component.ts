import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import { MandelPlot } from './mandelpic/mandelpic.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: ['canvas { border-style: solid }']
})
export class AppComponent implements OnInit {
  //@ViewChild('canvas', { static: true })
  //canvas: ElementRef<HTMLCanvasElement>;  
  
  //private ctx: CanvasRenderingContext2D;
  //private mandel: MandelPlot = new MandelPlot();

  ngOnInit(): void {
    //this.ctx = this.canvas.nativeElement.getContext('2d');
    //this.mandel.iterate(this.ctx);
  }
}
