"use client";

import { Payload } from "../../gen/payload_pb";

export default function Client(props: { payload: Payload }) {
  return (
    <div>
      <h5>Payload rendered on the client</h5>
      <pre>largeNumber: {props.payload.largeNumber.toString()} ({type(props.payload.largeNumber)})</pre>
      <pre>double: {props.payload.double.toString()} ({type(props.payload.double)})</pre>
      <pre>bytes: {props.payload.bytes.toString()} ({type(props.payload.bytes)})</pre>
    </div>
  );
}

function type(value: unknown): string {
  if (value instanceof Uint8Array) {
    return "Uint8Array";
  }
  if (Array.isArray(value)) {
    return "Array";
  }
  return typeof value;
}
