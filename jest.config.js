module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore specific folders
    collectCoverage: true, // Enable coverage collection
    coverageDirectory: '<rootDir>/coverage/', // Output directory for coverage reports
    coverageReporters: ['json', 'lcov', 'text', 'clover'], // Formats for coverage reports
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Supported file extensions
  };
  