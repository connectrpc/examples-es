import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ElizaProvider } from "src/connect/client.provider";
import { ConnectModule } from "src/connect/connect.module";

import { AppComponent } from "./app.component";

@NgModule({
  imports: [
    AppComponent,
    BrowserModule,
    FormsModule,
    ConnectModule.forRoot({
      baseUrl: "https://demo.connectrpc.com",
    }),
  ],
  providers: [ElizaProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
