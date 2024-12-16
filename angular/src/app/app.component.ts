import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ObservableClient } from "src/connect/observable-client";
import { ElizaService } from "src/gen/connectrpc/eliza/v1/eliza_pb";
import { ELIZA } from "../connect/tokens";

interface Response {
  text: string;
  sender: "eliza" | "user";
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Eliza";
  project = "Angular";
  statement: string = "";
  responses: Response[] = [
    {
      text: "What is your name?",
      sender: "eliza",
    },
  ];
  introFinished: boolean = false;

  constructor(
    @Inject(ELIZA)
    private client: ObservableClient<typeof ElizaService>,
  ) {}

  onSend(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.responses = [
      ...this.responses,
      { text: this.statement, sender: "user" },
    ];
    if (this.introFinished) {
      this.client.say({ sentence: this.statement }).subscribe((next) => {
        this.responses = [
          ...this.responses,
          { text: next.sentence, sender: "eliza" },
        ];
      });
    } else {
      this.client.introduce({ name: this.statement }).subscribe(
        (next) => {
          this.responses = [
            ...this.responses,
            { text: next.sentence, sender: "eliza" },
          ];
        },
        (err) => console.log(err),
        () => {
          this.introFinished = true;
        },
      );
    }
    this.statement = "";
  }
}
