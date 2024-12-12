import React, { useState } from "react";
import { fetch } from "expo/fetch";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { createClient, Code, ConnectError } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import {
  ElizaService,
  IntroduceRequestSchema,
} from "../gen/connectrpc/eliza/v1/eliza_pb.js";
import { create } from "@bufbuild/protobuf";

interface ConvoResponse {
  text: string;
  sender: "eliza" | "user";
}

function Index() {
  const [statement, setStatement] = useState<string>("");
  const [introFinished, setIntroFinished] = useState<boolean>(false);
  const [responses, setResponses] = useState<ConvoResponse[]>([
    {
      text: "What is your name?",
      sender: "eliza",
    },
  ]);

  const abort = new AbortController();

  // Make the Eliza Service client using grpc-web transport.
  const client = createClient(
    ElizaService,
    // createGrpcWebTransport({
    createConnectTransport({
      baseUrl: "https://demo.connectrpc.com",
      // Customize fetch with the the Expo fetch implementation
      fetch: (input, init) => {
        return fetch(input.toString(), {
          ...init,
          body: init?.body ?? undefined,
          credentials: init?.credentials ?? undefined,
          signal: init?.signal ?? undefined,
        });
        // TODO - Need to return a type of Response here instead of Expo's FetchResponse
        // otherwise it fails compilation
        // return new Promise<Response>((resolve) => {
        //   fetch(input.toString(), {
        //     ...init,
        //     body: init?.body ?? undefined,
        //     credentials: init?.credentials ?? undefined,
        //     signal: init?.signal ?? undefined,
        //   }).then((resp) => {
        //     resolve(new Response(resp.body));
        //   });
        // });
      },
    }),
  );

  const send = async () => {
    setResponses((resp) => [...resp, { text: statement, sender: "user" }]);
    setStatement("");

    if (introFinished) {
      const response = await client.say({
        sentence: statement,
      });

      setResponses((resps) => [
        ...resps,
        { text: response.sentence, sender: "eliza" },
      ]);
    } else {
      try {
        const request = create(IntroduceRequestSchema, {
          name: statement,
        });

        let resps = 0;
        let stream = client.introduce(request, { signal: abort.signal });
        for await (const response of stream) {
          setResponses((resps) => [
            ...resps,
            { text: response.sentence, sender: "eliza" },
          ]);
          resps++;
          // if (resps === 2) {
          //   abort.abort();
          // }
        }
      } catch (err) {
        let text = "";
        if (err instanceof ConnectError) {
          if (err.code === Code.Unimplemented) {
            text = `Hi, ${statement}.  Streaming is not supported in React Native currently.`;
          } else if (err.code === Code.Canceled) {
            text = "Stream cancelled";
          } else {
            text = `A Connect error has occurred: ${err.code} - ${err.message}`;
          }
        } else {
          text = `An error has occurred: ${err}`;
        }
        setResponses((resps) => [
          ...resps,
          {
            text,
            sender: "eliza",
          },
        ]);
      }
      setIntroFinished(true);
    }
  };

  return (
    <ScrollView style={styles.app}>
      <View style={styles.appHeader}>
        <Text style={styles.h1}>Eliza</Text>
        <Text style={styles.h4}>React Native</Text>
      </View>
      <View style={styles.container}>
        {responses.map((resp, i) => {
          return (
            <View
              key={`resp${i}`}
              style={
                resp.sender === "eliza"
                  ? styles.elizaRespContainer
                  : styles.userRespContainer
              }
            >
              <Text
                style={[
                  styles.respText,
                  resp.sender === "eliza"
                    ? styles.elizaRespText
                    : styles.userRespText,
                ]}
              >
                {resp.text}
              </Text>
            </View>
          );
        })}
        <TextInput
          style={styles.textInput}
          value={statement}
          onChangeText={setStatement}
        />
        <Button title="Send" onPress={send}></Button>
      </View>
    </ScrollView>
  );
}

export default Index;

const styles = StyleSheet.create({
  h1: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },
  h4: {
    marginTop: 0,
    marginHorizontal: 0,
    marginBottom: 15,
    color: "#161ede",
  },
  app: {
    backgroundColor: "#fafafa",
  },
  container: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    padding: 15,
    marginVertical: 0,
    marginHorizontal: "auto",
    maxWidth: 1320,
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
    borderLeftColor: "#ebebeb",
    borderRightColor: "#ebebeb",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    minHeight: Dimensions.get("window").height,
  },
  appHeader: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "center",
    color: "#000",
    backgroundColor: "#fff",
    borderBottomColor: "#ebebeb",
    borderBottomWidth: 1,
  },
  elizaRespContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    borderWidth: 2,
    borderColor: "#ebebeb",
    borderRadius: 28,
    marginVertical: 5,
  },
  respText: {
    fontSize: 18,
    margin: 5,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: "#09083a",
    borderRadius: 28,
    overflow: "hidden",
  },
  elizaRespText: {
    color: "#090a3a",
  },
  userRespContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    textAlign: "right",
    borderRadius: 28,
    borderWidth: 0,
  },
  userRespText: {
    color: "#165fed",
    backgroundColor: "#e0edff",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ebebeb",
    padding: 10,
    marginVertical: 5,
  },
});
