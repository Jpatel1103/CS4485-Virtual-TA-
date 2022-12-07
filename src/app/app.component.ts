import { Component, OnInit, Renderer2, ElementRef, ViewChild, } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})

export class AppComponent implements OnInit {
  animated : boolean = false;
  message : string ="";
  loading : boolean = false;
  dropup: boolean = false;
  @ViewChild('container') container!: ElementRef;
  sessionId = Math.random().toString(36).slice(-5);

  title = 'ChatBot';
  colorBackRight: string = '#007bff';
  colorFontRight: string = '#ffffff';
  colorBackLeft: string = '#eeeeee';
  colorFontLeft: string = '#343a40';
  messages = [];


  ngOnInit() {
  }
}
