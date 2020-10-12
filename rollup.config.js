import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';

export default {
	input: 'src/index.ts',
	output: {
		name: 'QuantumConsole',
		file: pkg.main,
		format: 'umd'
	},
	plugins: [
		replace({ __VERSION__: pkg.version }),
		resolve(),
		commonjs(),
		typescript()
	]
};
