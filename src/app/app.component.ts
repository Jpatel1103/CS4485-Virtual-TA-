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
  @ViewChild('container') container!: ElementRef;
  ngOnInit(){
  }
  constructor(private renderer : Renderer2){

  }

  sendButton(){
    if(this.message != ""){
    const el = this.renderer.createElement("div");
    this.renderer.addClass(el,"my-chat");
    const text = this.renderer.createText(this.message);
    this.renderer.appendChild(el,text);
    const messagebox = document.getElementById("message-box");
    messagebox?.appendChild(el);
    this.message="";
    }
  }
   scrollToBottom() {
    this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
}
}