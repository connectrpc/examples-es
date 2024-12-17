import { ApplicationConfig } from '@angular/core';
import { provideConnect } from "../connect/connect.module";
import { provideProtractorTestingSupport } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [
    provideConnect({
      baseUrl: "https://demo.connectrpc.com",
    }),
    provideProtractorTestingSupport(),
  ],
};
