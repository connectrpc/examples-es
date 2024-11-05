import { type Component, mount, unmount } from "svelte";
import flushPromises from "flush-promises";
import { test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/svelte";
import {
  type ConnectRouter,
  createRouterTransport,
  type Transport,
} from "@connectrpc/connect";
import {
  ElizaService,
  type IntroduceRequest,
  type SayRequest,
} from "../gen/connectrpc/eliza/v1/eliza_pb.js";
import TestPage from "./Test.svelte";
import ElizaPage from "../routes/+page.svelte";

function renderWithMockRoutes(
  component: Component,
  routes: (router: ConnectRouter) => void,
) {
  const mockTransport = createRouterTransport(routes);
  render(TestPage, {
    props: {
      SvelteComponent: component,
      context_key: "transport",
      context_value: mockTransport,
    },
  });
}

test("Component", async () => {
  renderWithMockRoutes(ElizaPage, ({ service }) => {
    service(ElizaService, {
      say(req: SayRequest) {
        expect(req.sentence).toEqual("Goodbye");
        return {
          sentence: "This is a mock response to say.",
        };
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
  expect(screen.getByTestId("test0").textContent).toEqual("What is your name?");

  // Enter a name in the input and click send
  fireEvent.input(input, {
    target: {
      value: "Steve",
    },
  });
  await fireEvent.click(sendButton);
  await flushPromises();

  // The sent name should appear as the next response in the chat
  expect(screen.getByTestId("test1").textContent).toEqual("Steve");

  // Wait for the introduce response from our mocked Eliza and verify it is our mocked response
  let response = await screen.findByTestId("test2");
  expect(response.textContent).toEqual(
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
  expect(screen.getByTestId("test3").textContent).toEqual("Goodbye");

  // Wait for the say response from our mocked Eliza and verify it is our mocked response
  response = await screen.findByTestId("test4");
  expect(response.textContent).toEqual("This is a mock response to say.");
});
