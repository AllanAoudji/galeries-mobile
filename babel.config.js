module.exports = (api) => {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
            [
                'module-resolver',
                {
                    root: ['./app'],
                    alias: {
                        '#components': './src/components',
                        '#contexts': './src/contexts',
                        '#helpers': './src/helpers',
                        '#screens': './src/screens',
                        '#store': './src/store',
                    },
                },
            ],
        ],
    };
};
