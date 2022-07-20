import {
    c as create_ssr_component,
    a as add_attribute,
    b as each,
    e as escape,
} from '../../chunks/index-1259f1f6.js'
import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { proto3, MethodKind } from '@bufbuild/protobuf'
const SayRequest = proto3.makeMessageType(
    'buf.connect.demo.eliza.v1.SayRequest',
    () => [{ no: 1, name: 'sentence', kind: 'scalar', T: 9 }]
)
const SayResponse = proto3.makeMessageType(
    'buf.connect.demo.eliza.v1.SayResponse',
    () => [{ no: 1, name: 'sentence', kind: 'scalar', T: 9 }]
)
const ConverseRequest = proto3.makeMessageType(
    'buf.connect.demo.eliza.v1.ConverseRequest',
    () => [{ no: 1, name: 'sentence', kind: 'scalar', T: 9 }]
)
const ConverseResponse = proto3.makeMessageType(
    'buf.connect.demo.eliza.v1.ConverseResponse',
    () => [{ no: 1, name: 'sentence', kind: 'scalar', T: 9 }]
)
const IntroduceRequest = proto3.makeMessageType(
    'buf.connect.demo.eliza.v1.IntroduceRequest',
    () => [{ no: 1, name: 'name', kind: 'scalar', T: 9 }]
)
const IntroduceResponse = proto3.makeMessageType(
    'buf.connect.demo.eliza.v1.IntroduceResponse',
    () => [{ no: 1, name: 'sentence', kind: 'scalar', T: 9 }]
)
const ElizaService = {
    typeName: 'buf.connect.demo.eliza.v1.ElizaService',
    methods: {
        say: {
            name: 'Say',
            I: SayRequest,
            O: SayResponse,
            kind: MethodKind.Unary,
        },
        converse: {
            name: 'Converse',
            I: ConverseRequest,
            O: ConverseResponse,
            kind: MethodKind.BiDiStreaming,
        },
        introduce: {
            name: 'Introduce',
            I: IntroduceRequest,
            O: IntroduceResponse,
            kind: MethodKind.ServerStreaming,
        },
    },
}
var index_svelte_svelte_type_style_lang = /* @__PURE__ */ (() =>
    '.app.svelte-1089cum{text-align:center}.app-header.svelte-1089cum{background-color:#282c34;min-height:100vh;display:flex;flex-direction:column;align-items:center;font-size:calc(10px + 2vmin);color:white}.app-title.svelte-1089cum{display:flex;justify-content:space-evenly;align-items:center}.prompt-text.svelte-1089cum{margin:0 0 15px 0}.intro-container.svelte-1089cum{margin:15px}.resp-text.svelte-1089cum{font-size:1rem;margin:5px}.text-input.svelte-1089cum{width:200px}h1.svelte-1089cum{margin-bottom:0}')()
const css = {
    code: '.app.svelte-1089cum{text-align:center}.app-header.svelte-1089cum{background-color:#282c34;min-height:100vh;display:flex;flex-direction:column;align-items:center;font-size:calc(10px + 2vmin);color:white}.app-title.svelte-1089cum{display:flex;justify-content:space-evenly;align-items:center}.prompt-text.svelte-1089cum{margin:0 0 15px 0}.intro-container.svelte-1089cum{margin:15px}.resp-text.svelte-1089cum{font-size:1rem;margin:5px}.text-input.svelte-1089cum{width:200px}h1.svelte-1089cum{margin-bottom:0}',
    map: null,
}
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let name = ''
    let intros = []
    let answers = []
    createPromiseClient(
        ElizaService,
        createConnectTransport({ baseUrl: 'https://demo.connect.build' })
    )
    $$result.css.add(css)
    return `<div class="${'app svelte-1089cum'}"><header class="${'app-header svelte-1089cum'}"><div class="${'app-title svelte-1089cum'}"><div><h1 class="${'svelte-1089cum'}">Eliza</h1></div></div>
        <p class="${'prompt-text svelte-1089cum'}">What is your name?</p>
        <div><input type="${'text'}" class="${'text-input svelte-1089cum'}"${add_attribute(
        'value',
        name,
        0
    )}>
            <button>Introduce</button></div>
        <div class="${'intro-container svelte-1089cum'}">${each(
        intros,
        (intro) => {
            return `<p class="${'resp-text svelte-1089cum'}">${escape(
                intro
            )}</p>`
        }
    )}</div>
        ${``}
        <div class="${'intro-container svelte-1089cum'}">${each(
        answers,
        (answer) => {
            return `<p class="${'resp-text svelte-1089cum'}">${escape(
                answer
            )}</p>`
        }
    )}</div></header>
</div>`
})
export { Routes as default }
