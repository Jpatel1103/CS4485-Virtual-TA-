import { AfterViewChecked, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Message } from '../model/message.model';
import { TextMessage } from '../model/text-message.model';
import { ResponseMessage } from '../model/response-message.model';
import { environment } from 'src/environments/environment';
import { KatexModule } from 'ng-katex';
import { delay } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  BACK_ENABLED: boolean = true;
  @Input('messages') messages: Message[];
  @Input('colorBackRight') colorBackRight: string;
  @Input('colorFontRight') colorFontRight: string;
  @Input('colorBackLeft') colorBackLeft: string;
  @Input('colorFontLeft') colorFontLeft: string;

  textInput = '';
  hour: string;
  minute: string;
  now: string;

  repeat = true;
  greetMsg1 ="Hello, I am UTD Virtual TA chatbot for the Advanced Algorithm course."
  greetMsg2 ="I can answer basic course-related questions like algorithm' run time and definition"
  greetMsg3 ="How can I help you today?"

  constructor(private chatService: ChatService) {
    setInterval(() => {
      this.hour = new Date().toString().split(' ')[4].split(':')[0];
      this.minute = new Date().toString().split(' ')[4].split(':')[1];
      if (parseInt(this.hour) == 0)
       this.now = "12" + ':' + this.minute + " AM";
      else if (parseInt(this.hour) >=1 && parseInt(this.hour) <= 11)
        this.now = this.hour +':' +this.minute +" AM";
      else if (parseInt(this.hour) == 12)
       this.now = this.hour +':' +this.minute +" PM";
      else 
      this.now = (parseInt(this.hour)-12) +':' +this.minute +" PM";
    }, 1);

  }

  ngOnInit():void{
    this.greeting();
  }
  greeting(){
    if( this.repeat = true){
    let greetMessage1: Message = { text: this.greetMsg1, date: this.now, userOwner: false, name: "Bot"}
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.messages.push(greetMessage1);
  }, 2000);
    let greetMessage2: Message = { text: this.greetMsg2, date: this.now, userOwner: false, name: "Bot"}
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.messages.push(greetMessage2);
  }, 4000);
    let greetMessage3: Message = { text: this.greetMsg3, date: this.now, userOwner: false, name: "Bot"}
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.messages.push(greetMessage3);
  }, 6000); 
    this.repeat = false}
  }

  sendMessage(){
    if (this.textInput != ''){
    let newMessage: Message = {text: this.textInput, date: this.now, userOwner: true, name: "User"};
    this.messages.push(newMessage);

    let messageBack: TextMessage = { "firstname": environment.firstName, "text": this.textInput}
    if(this.BACK_ENABLED){
      this.chatService.sendMessage(messageBack)
      .subscribe((res: ResponseMessage) => {
        let messageReturn: Message = { text: res.responseMessage, date: this.now, userOwner: false, name: "Bot"}
        delay(5000);
        this.messages.push(messageReturn);

      });
    }
    this.textInput = '';
  }
  }

  onKey(event: any){
    if(event.keyCode == 13 && this.textInput.trim() != ''){
      this.sendMessage();
    }
  }
  
  const0()
{
  var message1=document.getElementById("ms") as HTMLInputElement;
  message1.value+="²";
}

const1 ()
{
  var message2=document.getElementById("ms") as HTMLInputElement;
  message2.value+="³";
}
const2 ()
{
  var message1=document.getElementById("ms") as HTMLInputElement;
  message1.value+="√";
}

const3 ()
{
  var message1=document.getElementById("ms") as HTMLInputElement;
  message1.value+="³√";
}

const4 ()
{
  var message1=document.getElementById("ms") as HTMLInputElement;
  message1.value+="!";
}


}
