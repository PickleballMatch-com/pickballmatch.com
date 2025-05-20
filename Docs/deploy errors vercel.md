[09:16:11.383] Running build in Washington, D.C., USA (East) – iad1
[09:16:11.383] Build machine configuration: 2 cores, 8 GB
[09:16:11.398] Cloning github.com/PickleballMatch-com/pickballmatch.com (Branch: feature/project-setup, Commit: b44ea58)
[09:16:11.406] Skipping build cache, deployment was triggered without cache.
[09:16:11.705] Cloning completed: 306.000ms
[09:16:12.103] Running "vercel build"
[09:16:12.592] Vercel CLI 41.7.3
[09:16:12.913] Running "install" command: `npm install`...
[09:16:19.093] npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is
[09:16:19.187] npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is
[09:16:29.581] 
[09:16:29.582] added 581 packages, and audited 582 packages in 16s
[09:16:29.583] 
[09:16:29.583] 177 packages are looking for funding
[09:16:29.583]   run `npm fund` for details
[09:16:29.605] 
[09:16:29.606] 4 moderate severity vulnerabilities
[09:16:29.606] 
[09:16:29.606] To address all issues (including breaking changes), run:
[09:16:29.607]   npm audit fix --force
[09:16:29.607] 
[09:16:29.607] Run `npm audit` for details.
[09:16:29.655] Detected Next.js version: 15.3.1
[09:16:29.656] Running "npm run build"
[09:16:29.773] 
[09:16:29.774] > pickleball-match@0.1.0 build
[09:16:29.774] > next build
[09:16:29.774] 
[09:16:30.388] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[09:16:30.389] This information is used to shape Next.js' roadmap and prioritize features.
[09:16:30.390] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[09:16:30.390] https://nextjs.org/telemetry
[09:16:30.390] 
[09:16:30.492]    ▲ Next.js 15.3.1
[09:16:30.493] 
[09:16:30.520]    Creating an optimized production build ...
[09:16:45.012] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (120kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[09:16:53.208]  ✓ Compiled successfully in 19.0s
[09:16:53.213]    Linting and checking validity of types ...
[09:16:59.442] 
[09:16:59.443] Failed to compile.
[09:16:59.443] 
[09:16:59.443] ./src/app/page.tsx
[09:16:59.443] 10:8  Error: 'Link' is defined but never used.  @typescript-eslint/no-unused-vars
[09:16:59.443] 102:66  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[09:16:59.443] 
[09:16:59.443] ./src/app/profile/edit/page.tsx
[09:16:59.443] 11:11  Error: 'user' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[09:16:59.443] 
[09:16:59.443] ./src/components/common/Button.tsx
[09:16:59.444] 38:45  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[09:16:59.444] 
[09:16:59.444] ./src/server/api/routers/matchRequests.ts
[09:16:59.444] 3:10  Error: 'db' is defined but never used.  @typescript-eslint/no-unused-vars
[09:16:59.444] 
[09:16:59.444] ./src/server/api/routers/users.ts
[09:16:59.444] 3:10  Error: 'db' is defined but never used.  @typescript-eslint/no-unused-vars
[09:16:59.444] 
[09:16:59.444] ./src/server/trpc/index.ts
[09:16:59.444] 4:10  Error: 'getAuth' is defined but never used.  @typescript-eslint/no-unused-vars
[09:16:59.444] 5:10  Error: 'currentUser' is defined but never used.  @typescript-eslint/no-unused-vars
[09:16:59.444] 12:10  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[09:16:59.444] 
[09:16:59.444] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[09:16:59.480] Error: Command "npm run build" exited with 1
[09:16:59.748] 
[09:17:02.855] Exiting build container


From develop: 

[09:17:25.089] Running build in Washington, D.C., USA (East) – iad1
[09:17:25.090] Build machine configuration: 2 cores, 8 GB
[09:17:25.165] Cloning github.com/PickleballMatch-com/pickballmatch.com (Branch: develop, Commit: 0c22b30)
[09:17:25.191] Skipping build cache, deployment was triggered without cache.
[09:17:26.029] Cloning completed: 852.000ms
[09:17:27.987] Running "vercel build"
[09:17:28.455] Vercel CLI 41.7.3
[09:17:28.982] Installing dependencies...
[09:17:34.366] npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is
[09:17:34.454] npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is
[09:17:45.399] 
[09:17:45.400] added 581 packages in 16s
[09:17:45.400] 
[09:17:45.400] 177 packages are looking for funding
[09:17:45.401]   run `npm fund` for details
[09:17:45.649] Detected Next.js version: 15.3.1
[09:17:45.655] Running "npm run build"
[09:17:46.223] 
[09:17:46.223] > pickleball-match@0.1.0 build
[09:17:46.223] > next build
[09:17:46.224] 
[09:17:47.526] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[09:17:47.528] This information is used to shape Next.js' roadmap and prioritize features.
[09:17:47.529] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[09:17:47.529] https://nextjs.org/telemetry
[09:17:47.530] 
[09:17:47.832]    ▲ Next.js 15.3.1
[09:17:47.833] 
[09:17:47.932]    Creating an optimized production build ...
[09:18:01.684] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (120kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[09:18:09.918]  ✓ Compiled successfully in 18.0s
[09:18:09.923]    Linting and checking validity of types ...
[09:18:15.478] 
[09:18:15.487] Failed to compile.
[09:18:15.487] 
[09:18:15.487] ./src/app/page.tsx
[09:18:15.488] 10:8  Error: 'Link' is defined but never used.  @typescript-eslint/no-unused-vars
[09:18:15.488] 102:66  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[09:18:15.488] 
[09:18:15.489] ./src/app/profile/edit/page.tsx
[09:18:15.490] 11:11  Error: 'user' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[09:18:15.490] 
[09:18:15.490] ./src/components/common/Button.tsx
[09:18:15.491] 38:45  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[09:18:15.491] 
[09:18:15.491] ./src/server/api/routers/matchRequests.ts
[09:18:15.491] 3:10  Error: 'db' is defined but never used.  @typescript-eslint/no-unused-vars
[09:18:15.491] 
[09:18:15.491] ./src/server/api/routers/users.ts
[09:18:15.492] 3:10  Error: 'db' is defined but never used.  @typescript-eslint/no-unused-vars
[09:18:15.492] 
[09:18:15.492] ./src/server/trpc/index.ts
[09:18:15.492] 4:10  Error: 'getAuth' is defined but never used.  @typescript-eslint/no-unused-vars
[09:18:15.492] 5:10  Error: 'currentUser' is defined but never used.  @typescript-eslint/no-unused-vars
[09:18:15.493] 12:10  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[09:18:15.493] 
[09:18:15.493] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[09:18:15.517] Error: Command "npm run build" exited with 1
[09:18:15.819] 
[09:18:18.915] Exiting build container