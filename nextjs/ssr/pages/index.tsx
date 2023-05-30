import React from "react";
import { InferGetServerSidePropsType } from "next";
import { createClient, wrapFetch } from "./utils";
import { KitchenSinkService } from "../gen/kitchensink_connect";
import { KitchenSinkRequest, KitchenSinkResponse } from "../gen/kitchensink_pb";

const ssrInput: KitchenSinkRequest = new KitchenSinkRequest({
  requestDouble: 1.1,
  requestFloat: 2.2,
  requestInt32: 3,
  requestInt64: 4n,
  requestUint32: 5,
  requestUint64: 6n,
  requestSint32: 7,
  requestSint64: 8n,
  requestFixed32: 9,
  requestFixed64: 10n,
  requestSfixed32: 11,
  requestSfixed64: 12n,
  requestBool: true,
  requestString: 'some string',
  requestBytes: new Uint8Array([1, 2, 3]),
  requestMapStringBool: {
    'some key': true,
  },
  requestRepeatedDouble: [1.1],
  requestRepeatedFloat: [2.2],
  requestRepeatedInt32: [3],
  requestRepeatedInt64: [4n],
  requestRepeatedUint32: [5],
  requestRepeatedUint64: [6n],
  requestRepeatedSint32: [7],
  requestRepeatedSint64: [8n],
  requestRepeatedFixed32: [9],
  requestRepeatedFixed64: [10n],
  requestRepeatedSfixed32: [11],
  requestRepeatedSfixed64: [12n],
  requestRepeatedBool: [true],
  requestRepeatedString: ['some string'],
  requestRepeatedBytes: [new Uint8Array([1, 2, 3])],
});

export const getServerSideProps = async () => {
  const client = createClient(
    KitchenSinkService,
    wrapFetch("calling from getServerSideProps", fetch)
  );
  const kitchenSinkResponse = await client.getKitchenSink(ssrInput);
  
  return {
    props: {
      response: kitchenSinkResponse.toJson(),
    },
  };
};

export default function Page({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const ssrOutput = KitchenSinkResponse.fromJson(response);
  console.log({ ssrInput, ssrOutput })

  return (
    <div>
      <h1>
        look at the console
      </h1>

      <pre>{JSON.stringify({ response }, null, 2)}</pre>
    </div>
  );
}
