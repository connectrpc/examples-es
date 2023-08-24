const ResolveTypeScriptPlugin = require("resolve-typescript-plugin");

// config-overrides.js
module.exports = {
    webpack: function (config) {
        config.resolve = {
            plugins: [new ResolveTypeScriptPlugin()],
        };
        return config;
    },
};
