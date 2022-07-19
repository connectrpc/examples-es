import React, { useState } from 'react'
import { Button, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from './gen/buf/connect/demo/eliza/v1/eliza_connectweb.js'
import { IntroduceRequest } from './gen/buf/connect/demo/eliza/v1/eliza_pb.js'
import "fast-text-encoding";
import { Platform } from 'react-native';

// Import polyfills if not running on web.  Attempting to import these in web mode will result in numerous errors
// trying to access react-native APIs
if (Platform.OS !== 'web') {
    import('react-native-polyfill-globals');
}

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
        if (Platform.OS === 'web') {
        const request = new IntroduceRequest({
            name,
        })

        let resps: string[] = []
        let stream = client.introduce(request);
        for await (const response of stream) {
            resps.push(response.sentence)
        }

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
        } else {
            setIntros([`Hi, ${name}.  You seem to be running on mobile and streaming is not supported.`]);
        }
    }

    const handleSay = () => {
        say(statement)
    }

    const handleIntroduce = () => {
        introduce(name)
    }

    return (
        <View style={styles.app}>
            <View style={styles.appHeader}>
                <View style={styles.appTitle}>
                    <View>
                        <Text style={styles.h1}>Eliza</Text>
                    </View>
                    <Text style={styles.promptText}>What is your name?</Text>
                </View>
                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                    />
                    <Button onPress={handleIntroduce} title="Introduce"></Button>
                </View>
                <View style={styles.introContainer}>
                    {intros.map((intro, i) => {
                        return (
                            <Text style={styles.respText} key={`resp${i}`}>
                                {intro}
                            </Text>
                        )
                    })}
                </View>
                {(showSayInput || Platform.OS !== 'web') ? (
                    <View style={styles.container}>
                        <TextInput
                            style={styles.textInput}
                            value={statement}
                            onChangeText={setStatement}
                        />
                        <Button title="Say" onPress={handleSay}></Button>
                </View>) : <React.Fragment />}
                <View style={styles.introContainer}>
                    {answers.map((answer: string, i:number) => {
                        return <Text key={i} style={styles.respText}>{answer}</Text>
                    })}
                </View>
            </View>
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    h1: {
        display: 'flex',
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 50,
    },
    app: {
    },
    appHeader: {
        backgroundColor: '#282c34',
        minHeight: Dimensions.get('window').height,
    },
    appTitle: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    promptText: {
        marginVertical: 0,
        marginHorizontal: 15,
        color: 'white',
        fontSize: 20,
    },
    introContainer: {
        margin: 15,
        justifyContent: 'center',
    },
    respText: {
        fontSize: 18,
        margin: 5,
        color: 'white',
        textAlign: 'center',
    },
    textInput: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderBottomColor: '#000000',
    }
});


