module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
    coverageDirectory: 'coverage',
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    setupFiles: ['fast-text-encoding'],};
  