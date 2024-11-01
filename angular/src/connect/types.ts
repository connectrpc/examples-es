import { DescMessage, DescMethod } from "@bufbuild/protobuf";

export type MethodKind = MethodInfo["methodKind"];

export type MethodInfo<
  I extends DescMessage = DescMessage,
  O extends DescMessage = DescMessage,
> =
  | MethodInfoUnary<I, O>
  | MethodInfoServerStreaming<I, O>
  | MethodInfoClientStreaming<I, O>
  | MethodInfoBiDiStreaming<I, O>;

export type MethodInfoUnary<
  I extends DescMessage,
  O extends DescMessage,
> = DescMethod & {
  methodKind: "unary";
  input: I;
  output: O;
};

export type MethodInfoServerStreaming<
  I extends DescMessage,
  O extends DescMessage,
> = DescMethod & {
  methodKind: "server_streaming";
  input: I;
  output: O;
};

export type MethodInfoClientStreaming<
  I extends DescMessage,
  O extends DescMessage,
> = DescMethod & {
  methodKind: "client_streaming";
  input: I;
  output: O;
};

export type MethodInfoBiDiStreaming<
  I extends DescMessage,
  O extends DescMessage,
> = DescMethod & {
  methodKind: "bidi_streaming";
  input: I;
  output: O;
};
