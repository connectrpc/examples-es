import "@testing-library/jest-dom";
import flushPromises from "flush-promises";
import { test, expect } from "vitest";
import type { ComponentType } from "svelte";
import { render, fireEvent, screen } from "@testing-library/svelte";
import { createRouterTransport } from "@connectrpc/connect";
import type { ConnectRouter } from "@connectrpc/connect";
import {
  ElizaService,
  SayResponseSchema,
  type IntroduceRequest,
  type SayRequest,
} from "../gen/connectrpc/eliza/v1/eliza_pb.js";
import ElizaPage from "../routes/+page.svelte";
import TestPage from "./Test.svelte";
import { create } from "@bufbuild/protobuf";

function renderWithMockRoutes(
  component: ComponentType,
  routes: (router: ConnectRouter) => void,
) {
  const mockTransport = createRouterTransport(routes);
  render(TestPage, {
    props: {
      Component: component,
      context_key: "transport",
      context_value: mockTransport,
    },
  });
}

test("against a mocked service", async () => {
  renderWithMockRoutes(ElizaPage, ({ service }) => {
    service(ElizaService, {
      say(req: SayRequest) {
        expect(req.sentence).toEqual("Goodbye");
        return create(SayResponseSchema, {
          sentence: "This is a mock response to say.",
        });
      },
      async *introduce(req: IntroduceRequest) {
        yield {
          sentence: `Hi ${req.name}, this is a mock response to introduce.`,
        };
      },
    });
  });
  const input = screen.getByRole("textbox");
  const sendButton = screen.getByRole("button");

  // The initial prompt from Eliza
  expect(screen.getByTestId("test0")).toHaveTextContent("What is your name?");

  // Enter a name in the input and click send
  fireEvent.input(input, {
    target: {
      value: "Steve",
    },
  });
  await fireEvent.click(sendButton);
  await flushPromises();

  // The sent name should appear as the next response in the chat
  expect(screen.getByTestId("test1")).toHaveTextContent("Steve");

  // // Wait for the introduce response from our mocked Eliza and verify it is our mocked response
  let response = await screen.findByTestId("test2");
  expect(response).toHaveTextContent(
    "Hi Steve, this is a mock response to introduce.",
  );

  // Enter another response in the input and click send
  fireEvent.input(input, {
    target: {
      value: "Goodbye",
    },
  });
  await fireEvent.click(sendButton);
  await flushPromises();

  // The new response should again appear in the chat
  expect(screen.getByTestId("test3")).toHaveTextContent("Goodbye");

  // Wait for the say response from our mocked Eliza and verify it is our mocked response
  response = await screen.findByTestId("test4");
  expect(response).toHaveTextContent("This is a mock response to say");
});
