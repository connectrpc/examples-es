import { Component, Inject } from '@angular/core'
import { ObservableClient } from 'src/connect/observable-client'
import { ElizaService } from 'src/gen/buf/connect/demo/eliza/v1/eliza_connectweb'

const INTRO_DELAY_MS = 500;

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
        let resps: string[] = []
        this.client.introduce({name: this.name}).subscribe(
            (next) => {
                resps.push(next.sentence)
            }, 
            (err) => console.log(err), 
            () => {
                setTimeout(() => {
                    this.showSayInput = true;
                }, resps.length * INTRO_DELAY_MS)

                for (var i = 0; i < resps.length; i++) {
                    ;((i) => {
                        setTimeout(() => {
                            this.intros = [...this.intros, resps[i]]
                        }, INTRO_DELAY_MS * (i + 1))
                    })(i)
                }
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
