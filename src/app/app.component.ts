import { Component, OnInit, Renderer2, ElementRef, ViewChild, Directive, Input, } from '@angular/core';
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

  //constructor(private http: HttpClient,private renderer : Renderer2) { }

  ngOnInit() {
    //this.addBotMessage('Hi, how can I help you?');
  }
  /*handleUserMessage(msg: string) {
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

  /*addUserMessage(msg: string) {
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
} */

const ()
{
  var message1=document.getElementById("ms") as HTMLInputElement;
  message1.value="O(1)";
}
const1 ()
{
  var message1=document.getElementById("ms") as HTMLInputElement;
  message1.value="O(logn)";
}
const2 ()
{
  var message1=document.getElementById("ms") as HTMLInputElement;
  message1.value="O(n)";
}
const3 ()
{
  var message1=document.getElementById("ms") as HTMLInputElement;
  message1.value="O(nlogn)";
}
const4 ()
{
  var message1=document.getElementById("ms") as HTMLInputElement;
  message1.value="O(n*n)";
}
const5 ()
{
  var message1=document.getElementById("ms") as HTMLInputElement;
  message1.value="O(n*n*n)";
}
const6 ()
{
  var message1=document.getElementById("ms") as HTMLInputElement;
  message1.value="O(n!)";
}
}
