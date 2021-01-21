# nuxt-router-module

## Features

Disable nuxt built-in router configs(building router configs from pages directory).  
You can use this module to load router configs automatically.

## Installation

```bash
$ npm install nuxt-router-module
```

## Setup

1. module configuration

```javascript
// nuxt.config.js
export default {
  modules: [
    [
      'nuxt-router-module',
      {
        /* module options */
      },
    ],
  ],

  // or
  routerModule: {
    /* module options */
    path: '~/routes',
    fileName: 'index.js',
  },
};
```

2. routes configuration

```javascript
// ~/routes/index.js

export default [
  {
    path: '/home',
    component: Home,
    // ... router configs
  },
];
```

## Options

- `path`
  > Location of your route file
  - Type: `string`
  - Default: `~`
- `fileName`

  > File name of your routes configuration in `path`
  > Must export valid Vue routes

  - Type: `string`
  - Default: `index.js`

- `routerOptions`
  > Same as `vue-router` router options
