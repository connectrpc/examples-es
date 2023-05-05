import { createConnectTransport } from "@bufbuild/connect-web";
import { createPromiseClient } from "@bufbuild/connect";
import type { ServiceType } from "@bufbuild/protobuf";
import { wrapFetch } from "./wrap-fetch";

export const createClient = <T extends ServiceType>(
  service: T,
  fetch: typeof globalThis.fetch
) => {
  const transport = createConnectTransport({
    baseUrl: 'https://demo.connect.build',
    fetch: wrapFetch('calling from connect', fetch),
  });
  return createPromiseClient(service, transport);
}
