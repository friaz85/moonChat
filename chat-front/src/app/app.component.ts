import { Component } from "@angular/core";
import { ChatService } from "./chat.service";
import * as $ from "jquery";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "chat-front";
  newMessage: string;
  messageList: string[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = "";
  }
  ngOnInit() {
    this.chatService.getMessages().subscribe((message: string) => {
      this.messageList.push(message);
    });
  }
}
