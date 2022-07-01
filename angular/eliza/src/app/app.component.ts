import { Component, Inject } from '@angular/core'
import { ObservableClient } from 'src/connect/observable-client'
import { ElizaService } from 'src/gen/buf/connect/demo/eliza/v1/eliza_connectweb'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'eliza'
    constructor(
        @Inject(ElizaService)
        private client: ObservableClient<typeof ElizaService>
    ) {}

    ngOnInit() {
        this.client.say({ sentence: 'something' }).subscribe((next) => {
            console.log(next.sentence)
        })
    }
}
