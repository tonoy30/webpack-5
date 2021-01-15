class BuildManifestPlugin {
	apply(compiler) {
		compiler.hooks.emit.tapAsync(
			"BuildManifestPlugin",
			(compilation, callback) => {
				let mainfest = JSON.stringify(
					compilation.getStats().toJson().assetsByChunkName
				);
				compilation.assets["mainfest.json"] = {
					source: function () {
						return mainfest;
					},
					size: function () {
						return mainfest.length;
					},
				};

				callback();
			}
		);
	}
}
module.exports = BuildManifestPlugin;
