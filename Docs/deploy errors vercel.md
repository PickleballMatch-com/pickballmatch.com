[09:34:17.098] Running build in Washington, D.C., USA (East) – iad1
[09:34:17.098] Build machine configuration: 2 cores, 8 GB
[09:34:17.126] Cloning github.com/PickleballMatch-com/pickballmatch.com (Branch: develop, Commit: fcb7fa6)
[09:34:17.465] Previous build caches not available
[09:34:17.543] Cloning completed: 417.000ms
[09:34:19.188] Running "vercel build"
[09:34:19.570] Vercel CLI 41.7.3
[09:34:19.892] Installing dependencies...
[09:34:25.543] npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is
[09:34:25.609] npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is
[09:34:36.897] 
[09:34:36.898] added 581 packages in 17s
[09:34:36.901] 
[09:34:36.902] 177 packages are looking for funding
[09:34:36.905]   run `npm fund` for details
[09:34:37.185] Detected Next.js version: 15.3.1
[09:34:37.192] Running "npm run build"
[09:34:37.326] 
[09:34:37.327] > pickleball-match@0.1.0 build
[09:34:37.327] > next build
[09:34:37.327] 
[09:34:38.478] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[09:34:38.479] This information is used to shape Next.js' roadmap and prioritize features.
[09:34:38.480] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[09:34:38.480] https://nextjs.org/telemetry
[09:34:38.481] 
[09:34:38.679]    ▲ Next.js 15.3.1
[09:34:38.680] 
[09:34:38.787]    Creating an optimized production build ...
[09:34:52.539] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (120kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[09:35:00.716]  ✓ Compiled successfully in 18.0s
[09:35:00.722]    Skipping validation of types
[09:35:00.722]    Skipping linting
[09:35:00.977]    Collecting page data ...
[09:35:03.423]    Generating static pages (0/11) ...
[09:35:04.662]    Generating static pages (2/11) 
[09:35:04.663]    Generating static pages (5/11) 
[09:35:04.663]    Generating static pages (8/11) 
[09:35:04.663]  ⨯ useSearchParams() should be wrapped in a suspense boundary at page "/profile/edit". Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
[09:35:04.663]     at o (/vercel/path0/.next/server/chunks/141.js:4:7013)
[09:35:04.664]     at d (/vercel/path0/.next/server/chunks/141.js:41:95569)
[09:35:04.664]     at c (/vercel/path0/.next/server/app/profile/edit/page.js:1:1064)
[09:35:04.664]     at nF (/vercel/path0/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:76:46843)
[09:35:04.664]     at nH (/vercel/path0/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:76:48618)
[09:35:04.664]     at nW (/vercel/path0/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:76:67762)
[09:35:04.665]     at nz (/vercel/path0/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:76:65337)
[09:35:04.665]     at nB (/vercel/path0/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:76:47195)
[09:35:04.665]     at nH (/vercel/path0/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:76:48664)
[09:35:04.665]     at nH (/vercel/path0/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:76:64688)
[09:35:04.665] Error occurred prerendering page "/profile/edit". Read more: https://nextjs.org/docs/messages/prerender-error
[09:35:04.665] Export encountered an error on /profile/edit/page: /profile/edit, exiting the build.
[09:35:04.668]  ⨯ Next.js build worker exited with code: 1 and signal: null
[09:35:04.701] Error: Command "npm run build" exited with 1
[09:35:04.979] 
[09:35:08.023] Exiting build container