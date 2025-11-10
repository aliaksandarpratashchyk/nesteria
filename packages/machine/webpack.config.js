const { resolve } = require('path');

module.exports = {
	devtool: 'inline-source-map',
	entry: './src/index.ts',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		clean: true,
		filename: 'index.js',
		path: resolve(__dirname, 'dist'),
		library: {
			name: '@aliaksandarpratashchyk/nesteria',
			type: 'umd',
		},
	},
	target: ['web', 'es2022'],
};
