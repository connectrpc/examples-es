import { beforeEach, describe, it, expect } from "vitest";
import { flushPromises, mount, DOMWrapper, VueWrapper } from "@vue/test-utils";
import { createRouterTransport } from "@connectrpc/connect";
import { ElizaService } from "../../gen/connectrpc/eliza/v1/eliza_connect";
import {
    IntroduceRequest,
    SayRequest,
    SayResponse,
} from "../../gen/connectrpc/eliza/v1/eliza_pb";
import ElizaView from "../ElizaView.vue";
import { transportKey } from "../../keys";

const mockTransport = createRouterTransport(({ service }) => {
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

describe("ElizaView", () => {
    let input: DOMWrapper<Element>;
    let sendButton: DOMWrapper<Element>;
    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(ElizaView, {
            global: {
                provide: {
                    [transportKey as symbol]: mockTransport,
                },
            },
        });

        input = wrapper.find("#statement-input");
        sendButton = wrapper.find("#send-button");
    });

    it("uses a mock transport", async () => {
        let fi = wrapper.findAll(".eliza-resp-container p");

        expect(fi.at(0)?.text()).toContain("What is your name?");

        // Enter a name in the input and click send
        await input.setValue("Steve");
        await sendButton.trigger("click");

        // Wait for the introduce response from our mocked Eliza and verify it is our mocked response
        await flushPromises();
        fi = wrapper.findAll(".eliza-resp-container p");
        expect(fi.at(1)?.text()).toContain(
            "Hi Steve, this is a mock response to introduce.",
        );

        // Enter another response in the input and click send
        await input.setValue("Goodbye");
        await sendButton.trigger("click");

        // Wait for the say response from our mocked Eliza and verify it is our mocked response
        await flushPromises();
        fi = wrapper.findAll(".eliza-resp-container p");
        expect(fi.at(2)?.text()).toContain("This is a mock response to say");
    });
});
