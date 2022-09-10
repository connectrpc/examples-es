export default {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    "^.+\\.(ts|tsx)$": [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}

