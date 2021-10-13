module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.tsx', '.ts'],
        alias: {
          '#src/*': ['./src/*'],
          '#assets': ['./src/assets/index'],
          '#assets/*': ['./src/assets/*'],
          '#api': ['./src/service/network/api/index'],
          '#animated': ['./src/common/animated/index'],
          '#common': ['./src/common/index'],
          '#common/*': ['./src/common/*'],
          '#components': ['./src/components/index'],
          '#components/*': ['./src/components/*'],
          '#config': ['./src/config/index'],
          '#config/*': ['./src/config/*'],
          '#models': ['./src/service/network/model/index'],
          '#models/*': ['./src/service/network/model/*'],
          '#navigation': ['./src/navigation/*'],
          '#screens/*': ['./src/screens/*'],
          '#storage': ['./src/service/storage/index'],
          '#theme': ['./src/theme/index'],
          '#theme/*': ['./src/theme/*'],
          '#R': ['./src/assets/R.ts'],
          '#redux/*': ['./src/redux/slices/*'],
          '#utils': ['./src/utils/index'],
          '#utils/*': ['./src/utils/*']
        }
      }
    ]
  ],
  env: {
    production: {
      plugins: ['transform-remove-console']
    }
  }
};
