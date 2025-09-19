export default {
    pactBrokerUrl: process.env.PACT_BROKER_URL || 'https://pact-broker.myorg.com',
    pactBrokerToken: process.env.PACT_BROKER_TOKEN,
    publishVerificationResult: true,
    consumerVersion: process.env.GITHUB_SHA || 'dev',
};
