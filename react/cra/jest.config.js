module.exports = {
    transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest"],
    },
    testEnvironment: "@bufbuild/jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleNameMapper: {
        "(.+)\\.js": "$1",
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    },
};
