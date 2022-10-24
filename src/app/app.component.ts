import { Component, OnInit, Renderer2, ElementRef, ViewChild, Directive, } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
const dialogflowURL = 'https://YOUR-CLOUDFUNCTION/dialogflowGateway';

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
  @ViewChild('container') container!: ElementRef;
  sessionId = Math.random().toString(36).slice(-5);

  constructor(private http: HttpClient,private renderer : Renderer2) { }

  ngOnInit() {
    this.addBotMessage('Hi, how can I help you?');
  }

  handleUserMessage(msg: string) {
    if(msg !=""){
    this.addUserMessage(msg);

    this.loading = true;

    // Make the request 
    this.http.post<any>(
      dialogflowURL,
      {
        sessionId: this.sessionId,
        queryInput: {
          text: {
            msg,
            languageCode: 'en-US'
          }
        }
      }
    )
    .subscribe(res => {
      const { fulfillmentText } = res;
      this.addBotMessage(fulfillmentText);
      this.loading = false;
    });
  }
}

  addUserMessage(msg: string) {
      this.message = msg;
      const el = this.renderer.createElement("div");
      this.renderer.addClass(el,"my-chat");
      const text = this.renderer.createText(this.message);
      this.renderer.appendChild(el,text);
      const messagebox = document.getElementById("message-box");
      messagebox?.appendChild(el);
      this.message="";
  }

  addBotMessage(msg: string) {
    this.message = msg;
    const el = this.renderer.createElement("div");
    this.renderer.addClass(el,"client-chat");
    const text = this.renderer.createText(this.message);
    this.renderer.appendChild(el,text);
    const messagebox = document.getElementById("message-box");
    messagebox?.appendChild(el);
    this.message="";
  }


   scrollToBottom() {
    this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
}
}
