import { Message } from "@bufbuild/protobuf";

/**
 * Removes the $typeName and $unknown properties from a message.
 */
export type OmitTypeName<T extends Message> = {
  [P in keyof T as P extends "$typeName" | "$unknown" ? never : P]: Recurse<
    T[P]
  >;
};

// prettier-ignore
type Recurse<F> =
    F extends Array<infer U> ? Array<Recurse<U>>
  : F extends Message ? OmitTypeName<F>
  : F extends {case: infer C extends string; value: infer V extends Message} ? {case: C; value: OmitTypeName<V>}
  : F extends { [key: string]: infer V extends Message } ? { [key: string]: OmitTypeName<V> }
  : F extends { [key: number]: infer V extends Message } ? { [key: number]: OmitTypeName<V> }
  : F ;
