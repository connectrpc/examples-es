import { fireEvent, render, screen } from "@testing-library/react";
import {
    createPromiseClient,
    createRouterTransport,
    Transport,
} from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { ElizaService } from "./gen/connectrpc/eliza/v1/eliza_connect.js";
import {
    IntroduceRequest,
    SayRequest,
    SayResponse,
} from "./gen/connectrpc/eliza/v1/eliza_pb.js";
import { ChatContainer } from "./App.js";

describe("service definition", () => {
    test("creates a promise client", () => {
        const client = createPromiseClient(
            ElizaService,
            createConnectTransport({
                baseUrl: "https://demo.connectrpc.com",
            }),
        );
        expect(client.say).toBeDefined();
        expect(client.introduce).toBeDefined();
    });
});

describe("mocking transport", () => {
    let mockTransport: Transport;
    let input: HTMLElement;
    let sendButton: HTMLElement;

    beforeEach(() => {
        mockTransport = createRouterTransport(({ service }) => {
            service(ElizaService, {
                say(req: SayRequest) {
                    expect(req.sentence).toEqual("Goodbye");
                    return new SayResponse({
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

        render(<ChatContainer transport={mockTransport} />);

        input = screen.getByRole("textbox");
        sendButton = screen.getByRole("button");
    });

    test("uses a mock transport", async () => {
        // The initial prompt from Eliza
        expect(screen.getByTestId("test0")).toHaveTextContent(
            "What is your name?",
        );

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

        // Enter another response in the input and click send
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
});
