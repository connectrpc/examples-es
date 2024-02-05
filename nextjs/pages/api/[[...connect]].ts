import { nextJsApiRouter } from "@connectrpc/connect-next";
import routes from "../../connect";

const { handler, config } = nextJsApiRouter({ routes });
export { handler as default, config };
