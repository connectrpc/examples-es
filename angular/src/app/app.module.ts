import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { provideClient } from 'src/connect/client.provider'
import { ConnectModule } from 'src/connect/connect.module'
import { ElizaService } from 'src/gen/buf/connect/demo/eliza/v1/eliza_connectweb'

import { AppComponent } from './app.component'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ConnectModule.forRoot({
            baseUrl: 'https://demo.connect.build',
        }),
    ],
    providers: [provideClient(ElizaService)],
    bootstrap: [AppComponent],
})
export class AppModule {}
