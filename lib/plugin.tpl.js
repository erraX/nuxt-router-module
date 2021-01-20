import Vue from 'vue';
import qs from 'qs';
import Router from 'vue-router';

// 每个模块中有 `route.js` 文件的，就import进来
// `../business` 的路径不是相对于本文件的，最后生成的文件都在
// `.nuxt` 里面，所以路径是相对于生成的文件的所在路径

// import CampaignRoutes from '../business/Campaign/route';
// ...
<% options.modules.forEach(module => { %>
  import <%- module %>Routes from '../business/<%- module %>/route';
<% }) %>

Vue.use(Router);

export function createRouter(ssrContext) {
  let routes = [];

  // routes = routes.concat(CampaignRoutes);
  // ...
<% options.modules.forEach(module => { %>
    routes = routes.concat(<%- module %>Routes);
  <% }) %>

  return new Router({
    ...JSON.parse(`<%= JSON.stringify(options.moduleOptions, null, 2) %>`),
    routes,
    base: decodeURI('<%= options.baseUrl %>'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    fallback: false,
    parseQuery: qs.parse,
    stringifyQuery(query) {
      const queryStr = qs.stringify(query);
      return queryStr ? ('?' + queryStr) : '';
    }
  });
}

