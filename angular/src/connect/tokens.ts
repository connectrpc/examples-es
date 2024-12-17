import { ElizaService } from "src/gen/connectrpc/eliza/v1/eliza_pb";
import { createClientToken } from "./connect.module";

export const ELIZA = createClientToken(ElizaService);
