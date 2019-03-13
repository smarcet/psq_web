module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/preset-env", {
            "targets": {
                "node": "current"
            }
        }
        ],
        "@babel/react"
    ];

    const plugins = [
        "@babel/plugin-proposal-object-rest-spread",
        ["@babel/plugin-transform-async-to-generator", {
            "module": "bluebird",
            "method": "coroutine"
        }]
    ];

    return {
        presets,
        plugins
    };
}