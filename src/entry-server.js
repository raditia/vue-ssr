import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

/**
 * @param {string} url
 */
export async function render(url) {
  const { app, router } = createApp()

  router.push(url)
  // Wait until the router has resolved all async hooks.
  await router.isReady()

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx = {}
  const html = await renderToString(app, ctx)

  return { html }
}
