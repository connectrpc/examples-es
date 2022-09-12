export default {
  transform: {
    "^.+\\.(ts|tsx)$": [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
}

