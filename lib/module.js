import { resolve } from 'path';
import { existsSync } from 'fs';
import { get } from 'lodash-es';
import {
  resolveBusiness,
  takeValidModules,
} from '../utils';

export default function (moduleOptions) {
  const options = {
    ...this.options['router-module'],
    ...this.options.routerModule,
    ...moduleOptions,
  };

  // 所有存在 `route.js` 的模块名
  const modules = takeValidModules(name => existsSync(resolveBusiness(name, 'route.js')) ||
    existsSync(resolveBusiness(name, 'route.ts')));

  // Add plugin to import router file path as the main template for routing
  this.addPlugin({
    src: resolve(__dirname, 'plugin.tpl.js'),
    fileName: 'router.js',
    options: {
      modules,
      moduleOptions: options || {},
      baseUrl: get(this.options, 'router.base', '/'),
    },
  });

  // Disable parsing `pages/`
  this.nuxt.hook('build:before', () => {
    this.nuxt.options.build.createRoutes = () => [];
  });
}
