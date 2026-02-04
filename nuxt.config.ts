export default defineNuxtConfig({
  compatibilityDate: '2026-02-04',
  devtools: { enabled: true },
  telemetry: false,
  modules: [],
  app: {
    head: {
      title: '企业官网 - 提供优质厂家商品',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '我们为客户提供优质厂家商品，欢迎联系我们了解更多信息' },
        { name: 'keywords', content: '企业官网,厂家商品,优质产品,联系我们' }
      ]
    }
  },
  nitro: {
    experimental: {
      openAPI: true
    }
  }
})
