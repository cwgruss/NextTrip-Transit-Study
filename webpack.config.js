module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'sass-loader',
            options: {
              webpackImporter: false,
              sassOptions: {
                includePaths: ['node_modules'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            plugins: () => [require('tailwindcss'), require('autoprefixer')],
          },
        },
      },
    ],
  },
};
