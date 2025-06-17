module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      "nativewind/babel", // <-- Move this line here!
    ],
    plugins: [
      require.resolve("expo-router/babel"),
      // Other plugins go here, but not "nativewind/babel"
    ],
  };
};
