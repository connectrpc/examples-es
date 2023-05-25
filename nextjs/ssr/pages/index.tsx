import React from "react";
import { InferGetServerSidePropsType } from "next";
import { createClient, wrapFetch } from "./utils";
import { KitchenSinkService } from "../gen/kitchensink_connect";
import { KitchenSinkRequest, KitchenSinkResponse } from "../gen/kitchensink_pb";
import SuperJSON from "superjson";
import { SuperJSONResult } from "superjson/dist/types";

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
  const {
    responseDouble,
    responseFloat,
    responseInt32,
    responseInt64,
    responseUint32,
    responseUint64,
    responseSint32,
    responseSint64,
    responseFixed32,
    responseFixed64,
    responseSfixed32,
    responseSfixed64,
    responseBool,
    responseString,
    responseBytes,
    responseMapStringBool,
    responseRepeatedDouble,
    responseRepeatedFloat,
    responseRepeatedInt32,
    responseRepeatedInt64,
    responseRepeatedUint32,
    responseRepeatedUint64,
    responseRepeatedSint32,
    responseRepeatedSint64,
    responseRepeatedFixed32,
    responseRepeatedFixed64,
    responseRepeatedSfixed32,
    responseRepeatedSfixed64,
    responseRepeatedBool,
    responseRepeatedString,
    responseRepeatedBytes,
  } = await client.getKitchenSink(ssrInput);

  const kitchenSinkResponse = {
    responseDouble,
    responseFloat,
    responseInt32,
    responseInt64,
    responseUint32,
    responseUint64,
    responseSint32,
    responseSint64,
    responseFixed32,
    responseFixed64,
    responseSfixed32,
    responseSfixed64,
    responseBool,
    responseString,
    responseBytes,
    responseMapStringBool,
    responseRepeatedDouble,
    responseRepeatedFloat,
    responseRepeatedInt32,
    responseRepeatedInt64,
    responseRepeatedUint32,
    responseRepeatedUint64,
    responseRepeatedSint32,
    responseRepeatedSint64,
    responseRepeatedFixed32,
    responseRepeatedFixed64,
    responseRepeatedSfixed32,
    responseRepeatedSfixed64,
    responseRepeatedBool,
    responseRepeatedString,
    responseRepeatedBytes,
  };
  
  return {
    props: {
      superjsonResult: SuperJSON.serialize(kitchenSinkResponse),
    },
  };
};

const revive = <T extends new (...args: any[]) => any>(ResponseClass: T, superjsonResult: SuperJSONResult) => {
  return new ResponseClass(SuperJSON.deserialize<T>(superjsonResult))
}

export default function Page({
  superjsonResult,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const ssrOutput = revive(KitchenSinkResponse, superjsonResult);
  console.log({ ssrInput, ssrOutput, superjsonResult })

  return (
    <div>
      <h1>
        look at the console
      </h1>

      <pre>{JSON.stringify({ superjsonResult }, null, 2)}</pre>
    </div>
  );
}
