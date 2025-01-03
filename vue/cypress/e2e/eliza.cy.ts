import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import {
  ElizaService,
  IntroduceRequestSchema,
} from "../../src/gen/connectrpc/eliza/v1/eliza_pb.js";

describe("Eliza Testing", () => {
  it("imports properly", () => {
    expect(ElizaService).to.not.be.undefined;
    expect(IntroduceRequestSchema).to.not.be.undefined;
  });
  it("creates a promise client", () => {
    const client = createClient(
      ElizaService,
      createConnectTransport({
        baseUrl: "https://demo.connectrpc.com",
      }),
    );

    expect(client.say).to.not.be.undefined;
    expect(client.introduce).to.not.be.undefined;
  });
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Eliza");

    cy.get("#statement-input").type("Steve");
    cy.get("#send-button").click();
    cy.contains("p.resp-text", "Hi Steve. I'm Eliza.");

    cy.get("#statement-input").type("Happy");
    cy.get("#send-button").click();
    cy.get("#statement-input").clear();
    cy.get("#statement-input").type("Goodbye");
    cy.get("#send-button").click();
  });
});
