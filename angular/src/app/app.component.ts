import { Component, Inject } from '@angular/core'
import { ObservableClient } from 'src/connect/observable-client'
import { ElizaService } from 'src/gen/buf/connect/demo/eliza/v1/eliza_connectweb'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'Eliza'
    name: string = '';
    intros: string[] = [];
    statement: string = '';
    answers: string[] = [];
    showSayInput: boolean = false;
    constructor(
        @Inject(ElizaService)
        private client: ObservableClient<typeof ElizaService>
    ) {}

    ngOnInit() {
    }

    onIntroduce(event?: MouseEvent) {
        if (event) { event.stopPropagation(); }
        this.client.introduce({name: this.name}).subscribe(
            (next) => {
                this.intros = [...this.intros, next.sentence]
            }, 
            (err) => console.log(err), 
            () => {
                this.showSayInput = true;
            }
        );
    }

    onSay(event?: MouseEvent) {
        if (event) { event.stopPropagation(); }
        this.client.say({ sentence: this.statement }).subscribe((next) => {
            this.answers = [...this.answers, next.sentence]
        })
    }
}
