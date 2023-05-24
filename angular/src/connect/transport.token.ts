import { InjectionToken } from "@angular/core";
import type { Transport } from "@bufbuild/connect";

export const TRANSPORT = new InjectionToken<Transport>("connect.transport");
