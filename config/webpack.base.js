const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BuildManifestPlugin = require("../plugins/BuildManifestPlugin");

module.exports = (env) => {
	const devMode = env.NODE_ENV !== "production";

	return {
		entry: {
			app: path.resolve("src/index.js"),
		},
		mode: devMode ? "development" : "production",
		output: {
			path: path.resolve("dist"),
			filename: "[name].[contenthash].js",
		},
		module: {
			rules: [
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						// {
						// 	loader: "css-loader",
						// 	options: {
						// 		url: false,
						// 	},
						// },
						"sass-loader",
					],
				},
				{
					test: /\.(png|jpe?g|gif|svg)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								outputPath: "/assets/images",
								publicPath: "/assets/images",
								name: "[name].[ext]",
							},
						},
						"img-loader",
					],
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: devMode ? "[name].css" : "[name].[contenthash].css",
				chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: !devMode,
			}),
			new webpack.ProgressPlugin(),
			new CleanWebpackPlugin({
				root: __dirname,
				verbose: true,
				dry: false,
			}),
			new HtmlWebpackPlugin({
				filename: "index.html",
				template: path.resolve("public/index.html"),
				favicon: path.resolve("assets/favicon/favicon.ico"),
			}),
			new BuildManifestPlugin(),
		],
	};
};
