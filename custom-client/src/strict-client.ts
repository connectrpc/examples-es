import type {
  MethodInfoBiDiStreaming,
  MethodInfoClientStreaming,
  MethodInfoServerStreaming,
  MethodInfoUnary,
  PlainMessage,
  ServiceType,
  Message,
} from "@bufbuild/protobuf";
import type { Transport, CallOptions } from "@connectrpc/connect";
import { createPromiseClient } from "@connectrpc/connect";

// Tweak this to change the request signature like changing from PlainMessage to PartialMessage.
type Request<R, I extends Message<I>> =
  | Strict<R, PlainMessage<I>>
  | StrictMessage<R, I>;

// prettier-ignore
export type StrictClient<T extends ServiceType> = {
      [P in keyof T["methods"]]:
        T["methods"][P] extends MethodInfoUnary<infer I, infer O>           ? <R extends Request<R, I>>(request: R, options?: CallOptions) => Promise<O>
      : T["methods"][P] extends MethodInfoServerStreaming<infer I, infer O> ? <R extends Request<R, I>>(request: R, options?: CallOptions) => AsyncIterable<O>
      : T["methods"][P] extends MethodInfoClientStreaming<infer I, infer O> ? <R extends Request<R, I>>(request: AsyncIterable<R>, options?: CallOptions) => Promise<O>
      : T["methods"][P] extends MethodInfoBiDiStreaming<infer I, infer O>   ? <R extends Request<R, I>>(request: AsyncIterable<R>, options?: CallOptions) => AsyncIterable<O>
      : never;
    };

/**
 * Create a strict client from a service definition and a transport.
 */
export function createStrictClient<S extends ServiceType>(
  service: S,
  transport: Transport
) {
  return createPromiseClient(service, transport) as StrictClient<S>;
}

/**
 * Seals I to be exactly T.
 */
type StrictMessage<I, T extends Message<T>> = Equal<T, I> extends true
  ? T
  : never;

/**
 * Seals `I` to only contain field of `T`.
 */
type Strict<I, T> = Equal<T, I> extends true
  ? T
  : T extends any[]
  ? Array<Strict<Element<I>, Element<T>>>
  : T extends AnyRecord
  ? StrictRecord<I, T>
  : T;

type StrictRecord<I, T> = {
  [P in keyof T]: Strict<P extends keyof I ? I[P] : never, T[P]>;
} & Record<Exclude<keyof I, DistributiveKeyOf<T>>, never>;

type Element<T> = T extends (infer E)[] ? E : never;

type AnyRecord = { [K in string]: any };

type DistributiveKeyOf<T> = T extends T ? keyof T : never;

type Equal<L, R> = (<T>() => T extends L ? 1 : 2) extends <T>() => T extends R
  ? 1
  : 2
  ? true
  : false;
