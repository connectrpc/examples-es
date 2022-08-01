import {
    createPromiseClient,
    createConnectTransport,
} from '@bufbuild/connect-web'
import { ElizaService } from '../../src/gen/buf/connect/demo/eliza/v1/eliza_connectweb.js'
import { IntroduceRequest } from '../../src/gen/buf/connect/demo/eliza/v1/eliza_pb.js'

describe('Eliza Testing', () => {
    it('imports properly', () => {
        expect(ElizaService).to.not.be.undefined
        expect(IntroduceRequest).to.not.be.undefined
    })
    it('creates a promise client', () => {
        const client = createPromiseClient(
            ElizaService,
            createConnectTransport({
                baseUrl: 'https://demo.connect.build',
            })
        )

        expect(client.say).to.not.be.undefined
        expect(client.introduce).to.not.be.undefined
    })
    it('visits the app root url', () => {
        cy.visit('/')
        cy.contains('h1', 'Eliza')

        cy.get('#statement-input').type('Steve')
        cy.get('#send-button').click()
        cy.contains('p.resp-text', "Hi Steve. I'm Eliza.")

        cy.get('#statement-input').type('Happy')
        cy.get('#send-button').click()
        cy.get('#statement-input').clear()
        cy.get('#statement-input').type('Goodbye')
        cy.get('#send-button').click()
    })
})
