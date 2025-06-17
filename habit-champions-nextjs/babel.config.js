module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      "nativewind/babel", // This should stay here
    ],
    plugins: [
      // Remove: require.resolve("expo-router/babel"), <--- DELETE THIS LINE!
    ],
  };
};