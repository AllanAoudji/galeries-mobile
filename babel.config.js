module.exports = (api) => {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./app'],
                    alias: {
                        '#components': './src/components',
                        '#screens': './src/screens',
                    },
                },
            ],
        ],
    };
};
