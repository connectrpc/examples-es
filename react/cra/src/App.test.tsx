import { fireEvent, render, screen } from "@testing-library/react";
import { createRouterTransport } from "@connectrpc/connect";
import {
  ElizaService,
  SayResponseSchema,
} from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import {
  IntroduceRequest,
  SayRequest,
} from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import App from "./App.js";
import { TransportContext } from "./use-client.js";
import { create } from "@bufbuild/protobuf";

test("against a mocked service", async () => {
  const mockTransport = createRouterTransport(({ service }) => {
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
  render(
    <TransportContext.Provider value={mockTransport}>
      <App />
    </TransportContext.Provider>,
  );

  const input = screen.getByRole("textbox");
  const sendButton = screen.getByRole("button");

  // The initial prompt from Eliza
  expect(screen.getByTestId("test0")).toHaveTextContent("What is your name?");

  // Enter a name in the input and click send
  fireEvent.change(input, {
    target: {
      value: "Steve",
    },
  });
  fireEvent.click(sendButton);

  // The sent name should appear as the next response in the chat
  expect(screen.getByTestId("test1")).toHaveTextContent("Steve");

  // Wait for the introduce response from our mocked Eliza and verify it is our mocked response
  let response = await screen.findByTestId("test2");
  expect(response).toHaveTextContent(
    "Hi Steve, this is a mock response to introduce.",
  );

  // Enter another sentence and click send
  fireEvent.change(input, {
    target: {
      value: "Goodbye",
    },
  });
  fireEvent.click(sendButton);

  // The new response should again appear in the chat
  expect(screen.getByTestId("test3")).toHaveTextContent("Goodbye");

  // Wait for the say response from our mocked Eliza and verify it is our mocked response
  response = await screen.findByTestId("test4");
  expect(response).toHaveTextContent("This is a mock response to say");
});
