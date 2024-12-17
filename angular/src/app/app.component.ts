import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ELIZA } from "../connect/tokens";

interface Response {
  text: string;
  sender: "eliza" | "user";
}

@Component({
  selector: "app-root",
  imports: [CommonModule, FormsModule],
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  client = inject(ELIZA);
  title = "Eliza";
  project = "Angular";
  statement: string = "";
  responses: Response[] = [
    {
      text: "What is your name?",
      sender: "eliza",
    },
  ];
  introFinished = false;

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
