const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
	},
	entry: './src/index.ts',
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Nesteria',
		}),
	],
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.module\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							esModule: true,
							modules: {
								localIdentName: '[local]__[hash:base64:5]',
								namedExport: false,
								exportOnlyLocals: false,
							},
						},
					},
				],
			},
			{
				test: /\.css$/i,
				exclude: /\.module\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
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
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist'),
	},
};
