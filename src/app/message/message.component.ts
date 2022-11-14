import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input('text') text: string;
  @Input('date') date: any;
  @Input('owner') owner: boolean;
  @Input('colorBackRight') colorBackRight: string;
  @Input('colorFontRight') colorFontRight: string;
  @Input('colorBackLeft') colorBackLeft: string;
  @Input('colorFontLeft') colorFontLeft: string;

  constructor(private svc : ChatService){ 
  }

  ngOnInit(): void{
  }


}