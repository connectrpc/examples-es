const ResolveTypeScriptPlugin = require('resolve-typescript-plugin')

// config-overrides.js
module.exports = function override(config, env) {
    config.resolve = {
        plugins: [new ResolveTypeScriptPlugin()],
    }

    return config
}
