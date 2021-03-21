module.exports = {
  projects: ['<rootDir>/packages/**/jest.config.js'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['text-summary', 'lcov'],
};
