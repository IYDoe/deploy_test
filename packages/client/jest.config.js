export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: [ '<rootDir>/src/**/*.test.{ts,tsx}' ],
    globals: {
        __SERVER_PORT__: 3000,
        __DOCKER_BUILD__: true,
    },
}
