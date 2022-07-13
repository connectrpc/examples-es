import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from './gen/buf/connect/demo/eliza/v1/eliza_connectweb.js'
import { IntroduceRequest } from './gen/buf/connect/demo/eliza/v1/eliza_pb.js'
import "fast-text-encoding";
import Joi from "joi";
// import { polyfill } from 'react-native-polyfill-globals';
import 'react-native-polyfill-globals/auto';

// polyfill();

function App() {
    const [name, setName] = useState<string>('')
    const [statement, setStatement] = useState<string>('')
    const [intros, setIntros] = useState<string[]>([])
    const [answers, setAnswers] = useState<string[]>([])
    const [showSayInput, setShowSayInput] = useState<boolean>(false)

    const INTRO_DELAY_MS = 500

    // Make the Eliza Service client
    const client = createPromiseClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connect.build',
        })
    )

    const say = async (sentence: string) => {
        const response = await client.say({
            sentence,
        })

        setAnswers((answers) => [...answers, response.sentence])
    }

    const introduce = async (name: string) => {
        const request = new IntroduceRequest({
            name,
        })

        let resps: string[] = []
        let stream = client.introduce(request);
        for await (const response of stream) {
            resps.push(response.sentence)
        }

        // let channel = await client.introduce(request);
        // const iterator = channel[Symbol.asyncIterator]();
        // const result = [];
        // while (result.length < Infinity) {
        //     const { value, done } = await iterator.next();
        //     if (done) break;
        //     resps.push(value.sentence)
        // }

        setTimeout(() => {
            setShowSayInput(true)
        }, resps.length * INTRO_DELAY_MS)

        for (var i = 0; i < resps.length; i++) {
            ;(function (i) {
                setTimeout(function () {
                    setIntros((intro) => [...intro, resps[i]])
                }, INTRO_DELAY_MS * (i + 1))
            })(i)
        }
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleStatementChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStatement(event.target.value)
    }

    const handleSay = () => {
        say(statement)
    }

    const handleIntroduce = () => {
        introduce(name)
    }

    return (
        <View className="App">
            <View className="App-header">
                <View className="app-title">
                    <Text>React Native</Text>
                    <View>
                        <Text>Eliza</Text>
                        <Text>TypeScript</Text>
                    </View>
                    <Text>React Native</Text>
                </View>
                    <View>
                        <TextInput
                            type="text"
                            className="text-input"
                            value={statement}
                            onChange={handleStatementChange}
                        />
                        <Button title="Say" onPress={handleSay}></Button>
                    </View>
                <Text className="prompt-text">What is your name?</Text>
                <View>
                    <TextInput
                        type="text"
                        className="text-input"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <Button onPress={handleIntroduce} title="Introduce"></Button>
                </View>
                <View className="intro-container">
                    {intros.map((intro, i) => {
                        return (
                            <Text className="resp-text" key={`resp${i}`}>
                                {intro}
                            </Text>
                        )
                    })}
                </View>
                {showSayInput ? (
                    <View>
                        <TextInput
                            type="text"
                            className="text-input"
                            value={statement}
                            onChange={handleStatementChange}
                        />
                        <Button title="Say" onPress={handleSay}></Button>
                    </View>
                ) : (
                    <React.Fragment />
                )}
                <View className="intro-container">
                    {answers.map((answer: string) => {
                        return <Text className="resp-text">{answer}</Text>
                    })}
                </View>
            </View>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
