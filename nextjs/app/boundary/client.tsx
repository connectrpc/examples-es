"use client";

import { Payload } from "../../gen/payload_pb";

export default function Client(props: { payload: Payload }) {
  return (
    <div>
      <h5>Payload&apos;s large number, rendered on the client</h5>
      <pre>{props.payload.largeNumber.toString()}</pre>
    </div>
  );
}
