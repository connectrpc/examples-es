import { ElizaService } from "../gen/buf/connect/demo/eliza/v1/eliza_connectweb";

// Import service definition that you want to connect to.
import {
  Transport,
  ConnectError,
  createConnectTransport,
  createPromiseClient,
  PromiseClient,
} from "@bufbuild/connect-web";
import { useState } from "react";
import {
  useQuery as RQuseQuery,
  useMutation as RQuseMutation,
  UseQueryOptions,
  UseMutationOptions,
  UseQueryResult,
  UseMutationResult,
} from "react-query";
import {
  AnyMessage,
  Message,
  MethodInfoUnary,
  PartialMessage,
  ServiceType,
} from "@bufbuild/protobuf";
// The transport defines what type of endpoint we're hitting. In our example
// we'll be communicating with a Connect endpoint. Other transport layers will be
// provided in the future.
const transport = createConnectTransport({
  baseUrl: "https://demo.connect.build",
});

// Here we make the client itself, combining transport with the target service.
// Using the makePromiseClient utility gives us a promise based clients.

const client = createPromiseClient(ElizaService, transport);

type Options<I extends Message<AnyMessage>, O, K, C> = {
  input: PartialMessage<I>;
  output: O;
  key: K;
  client: C;
};

type ExtractQueryOptions<T extends ServiceType> = {
  [P in keyof T["methods"]]: T["methods"][P] extends MethodInfoUnary<
    infer I,
    infer O
  >
    ? Options<I, O, [T["methods"][P]["O"]["typeName"], I], PromiseClient<T>>
    : never;
};

type GetKeyOfForNotNeverValue<T> = {
  [P in keyof T]: T[P] extends never ? never : P;
}[keyof T];

function makeQueryHooks<
  T extends ServiceType,
  Options extends ExtractQueryOptions<T>
>(
  service: T,
  transport: Transport
): {
  useQuery: <
    MethodKey extends GetKeyOfForNotNeverValue<Options>,
    Input extends Options[MethodKey]["input"],
    Output extends Options[MethodKey]["output"],
    Key extends Options[MethodKey]["key"]
  >(
    method: MethodKey,
    input: Input,
    options?: Omit<
      UseQueryOptions<Output, ConnectError, Output, Key>,
      "queryKey" | "queryFn"
    >
  ) => UseQueryResult<Options[MethodKey]["output"], ConnectError>;
  useMutation: <
    MethodKey extends GetKeyOfForNotNeverValue<Options>,
    Input extends Options[MethodKey]["input"],
    Output extends Options[MethodKey]["output"],
    Context = unknown
  >(
    key: MethodKey,
    options?: Omit<
      UseMutationOptions<Output, ConnectError, Input, Context>,
      "mutationFn"
    >
  ) => UseMutationResult<Output, ConnectError, Input, Context>;
} {
  const client = createPromiseClient(service, transport);

  return {
    useQuery: (method, input, options) => {
      const queryKey = [service.methods[method].O.typeName, input] as any;
      return RQuseQuery({
        ...options,
        queryKey,
        queryFn: ({ signal }) => client[method](input, { signal }) as any,
      });
    },
    useMutation: (method, options) => {
      return RQuseMutation({
        ...options,
        mutationFn: (input) => client[method](input) as any,
      });
    },
  };
}

const { useMutation } = makeQueryHooks(ElizaService, transport);

function App() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    {
      fromMe: boolean;
      message: string;
    }[]
  >([]);

  const say = useMutation("say");

  return (
    <>
      <ol>
        {messages.map((msg, index) => (
          <li key={index}>
            {`${msg.fromMe ? "ME:" : "ELIZA:"} ${msg.message}`}
          </li>
        ))}
      </ol>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          // Clear inputValue since the user has submitted.
          setInputValue("");
          // Store the inputValue in the chain of messages and
          // mark this message as coming from "me"
          setMessages((prev) => [
            ...prev,
            {
              fromMe: true,
              message: inputValue,
            },
          ]);

          const response = await say.mutateAsync({ sentence: inputValue });
          setMessages((prev) => [
            ...prev,
            {
              fromMe: false,
              message: response.sentence,
            },
          ]);
        }}
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
