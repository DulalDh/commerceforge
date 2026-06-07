export default {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/setupEnv.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupDatabase.js'],
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  clearMocks: true,
  verbose: true
};
