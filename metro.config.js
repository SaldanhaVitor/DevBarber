const { getDefaultConfig } = require("@expo/metro-config");

module.exports = (async () => {
    const {
        resolver: { sourceExts, assetExts }
    } = await getDefaultConfig(__dirname);
    return {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false
            },
        }),
        transformer: {
            babelTransformerPath: require.resolve("react-native-svg-transformer")
        },
        resolver: {
            assetExts: assetExts.filter(ext => ext !== "svg"),
            sourceExts: [...sourceExts, "svg"]
        }
    };
})();