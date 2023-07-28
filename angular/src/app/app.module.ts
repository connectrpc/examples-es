import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { provideClient } from "src/connect/client.provider";
import { ConnectModule } from "src/connect/connect.module";
import { ElizaService } from "src/gen/connectrpc/eliza/v1/eliza_connect";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ConnectModule.forRoot({
      baseUrl: "https://demo.connectrpc.com",
    }),
  ],
  providers: [provideClient(ElizaService)],
  bootstrap: [AppComponent],
})
export class AppModule {}
