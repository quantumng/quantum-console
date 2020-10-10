import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default {
	input: 'src/index.ts',
	output: {
		name: 'QuantumConsole',
		file: pkg.main,
		format: 'umd'
	},
	plugins: [
		resolve(),
		commonjs(),
		typescript()
	]
};
