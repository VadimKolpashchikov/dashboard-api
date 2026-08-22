import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'node',
	setupFiles: ['<rootDir>/jest.setup.js'],
	extensionsToTreatAsEsm: ['.ts'],
	moduleNameMapper: {
		'^(\\.\\.?\\/.+)\\.js$': '$1',
	},
	verbose: true,
	testRegex: '.*\\.spec\\.tsx?$',
};

export default config;
