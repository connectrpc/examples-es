require("./index.css");
require("./App.css");

const React = require("react");
const { createClient } = require("@connectrpc/connect");
const { createConnectTransport } = require("@connectrpc/connect-web");
const { create } = require("@bufbuild/protobuf");
const {
  ElizaService,
  IntroduceRequestSchema,
} = require("./gen/connectrpc/eliza/v1/eliza_pb.js");

interface Response {
  text: string;
  sender: "eliza" | "user";
}

function App() {
  const [statement, setStatement] = React.useState("");
  const [introFinished, setIntroFinished] = React.useState(false);
  const [responses, setResponses] = React.useState([
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
    setResponses((resp: any) => [...resp, { text: sentence, sender: "user" }]);
    setStatement("");

    if (introFinished) {
      const response = await client.say({
        sentence,
      });

      setResponses((resp: any) => [
        ...resp,
        { text: response.sentence, sender: "eliza" },
      ]);
    } else {
      const request = create(IntroduceRequestSchema, {
        name: sentence,
      });

      for await (const response of client.introduce(request)) {
        setResponses((resp: any) => [
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
        <h4>React/Webpack-CJS</h4>
      </header>
      <div className="container">
        {responses.map((resp: Response, i: number) => {
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

module.exports = App;
