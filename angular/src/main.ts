/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideConnect } from "./connect/connect.module";

bootstrapApplication(AppComponent, {
  providers: [
    provideConnect({
      baseUrl: "https://demo.connectrpc.com",
    }),
    provideProtractorTestingSupport(),
  ],
}).catch((err) =>
  console.error(err),
);
