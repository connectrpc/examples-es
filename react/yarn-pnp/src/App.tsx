import React, { useState } from "react";
import "./App.css";
import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { create } from "@bufbuild/protobuf";
import {
  ElizaService,
  IntroduceRequestSchema,
} from "./gen/connectrpc/eliza/v1/eliza_pb.js";

interface Response {
  text: string;
  sender: "eliza" | "user";
}

function App() {
  const [statement, setStatement] = useState<string>("");
  const [introFinished, setIntroFinished] = useState<boolean>(false);
  const [responses, setResponses] = useState<Response[]>([
    {
      text: "What is your name?",
      sender: "eliza",
    },
  ]);

  // Make the Eliza Service client
  const client = createClient(
    ElizaService,
    createConnectTransport({
      baseUrl: "https://demo.connectrpc.com",
    }),
  );

  const send = async (sentence: string) => {
    setResponses((resp) => [...resp, { text: sentence, sender: "user" }]);
    setStatement("");

    if (introFinished) {
      const response = await client.say({
        sentence,
      });

      setResponses((resp) => [
        ...resp,
        { text: response.sentence, sender: "eliza" },
      ]);
    } else {
      const request = create(IntroduceRequestSchema, {
        name: sentence,
      });

      for await (const response of client.introduce(request)) {
        setResponses((resp) => [
          ...resp,
          { text: response.sentence, sender: "eliza" },
        ]);
      }

      setIntroFinished(true);
    }
  };

  const handleStatementChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStatement(event.target.value);
  };

  const handleSend = () => {
    send(statement);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div>
      <header className="app-header">
        <h1>Eliza</h1>
        <h4>Yarn Plug'n'Play/Vite</h4>
      </header>
      <div className="container">
        {responses.map((resp, i) => {
          return (
            <div
              key={`resp${i}`}
              className={
                resp.sender === "eliza"
                  ? "eliza-resp-container"
                  : "user-resp-container"
              }
            >
              <p className="resp-text">{resp.text}</p>
            </div>
          );
        })}
        <div>
          <input
            type="text"
            className="text-input"
            value={statement}
            onChange={handleStatementChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
