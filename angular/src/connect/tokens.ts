import { ElizaService } from "src/gen/connectrpc/eliza/v1/eliza_pb";
import { createClientToken } from "./connect.module";

// Create an injection token for the Eliza service client
export const ELIZA = createClientToken(ElizaService);

// Additional client tokens representing Connect services could be added here
