[14:50:11.045] Running build in Washington, D.C., USA (East) – iad1
[14:50:11.046] Build machine configuration: 2 cores, 8 GB
[14:50:11.060] Cloning github.com/PickleballMatch-com/pickballmatch.com (Branch: main, Commit: 4ab388a)
[14:50:11.369] Cloning completed: 309.000ms
[14:50:11.438] Previous build caches not available
[14:50:11.735] Running "vercel build"
[14:50:12.148] Vercel CLI 41.7.3
[14:50:12.460] Running "install" command: `npm install`...
[14:50:17.170] npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is
[14:50:17.249] npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is
[14:50:27.410] 
[14:50:27.411] added 451 packages, and audited 452 packages in 15s
[14:50:27.411] 
[14:50:27.412] 153 packages are looking for funding
[14:50:27.412]   run `npm fund` for details
[14:50:27.436] 
[14:50:27.437] 4 moderate severity vulnerabilities
[14:50:27.437] 
[14:50:27.437] To address all issues (including breaking changes), run:
[14:50:27.437]   npm audit fix --force
[14:50:27.437] 
[14:50:27.437] Run `npm audit` for details.
[14:50:27.505] Detected Next.js version: 15.3.1
[14:50:27.506] Running "npm run build"
[14:50:28.014] 
[14:50:28.015] > pickleball-match@0.1.0 build
[14:50:28.015] > next build
[14:50:28.016] 
[14:50:28.673] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[14:50:28.674] This information is used to shape Next.js' roadmap and prioritize features.
[14:50:28.674] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[14:50:28.674] https://nextjs.org/telemetry
[14:50:28.674] 
[14:50:28.782]    ▲ Next.js 15.3.1
[14:50:28.783] 
[14:50:28.816]    Creating an optimized production build ...
[14:50:38.707]  ⚠ Compiled with warnings in 8.0s
[14:50:38.708] 
[14:50:38.708] ./src/app/api/trpc/[trpc]/route.ts
[14:50:38.708] Attempted import error: 'auth' is not exported from '@clerk/nextjs' (imported as 'auth').
[14:50:38.708] 
[14:50:38.708] Import trace for requested module:
[14:50:38.709] ./src/app/api/trpc/[trpc]/route.ts
[14:50:38.709] 
[14:50:38.709] ./src/server/trpc/index.ts
[14:50:38.709] Attempted import error: 'auth' is not exported from '@clerk/nextjs' (imported as 'auth').
[14:50:38.709] 
[14:50:38.709] Import trace for requested module:
[14:50:38.709] ./src/server/trpc/index.ts
[14:50:38.709] ./src/server/api/root.ts
[14:50:38.709] ./src/app/api/trpc/[trpc]/route.ts
[14:50:38.709] 
[14:50:38.709] ./src/server/trpc/index.ts
[14:50:38.710] Attempted import error: 'currentUser' is not exported from '@clerk/nextjs' (imported as 'currentUser').
[14:50:38.710] 
[14:50:38.710] Import trace for requested module:
[14:50:38.710] ./src/server/trpc/index.ts
[14:50:38.710] ./src/server/api/root.ts
[14:50:38.710] ./src/app/api/trpc/[trpc]/route.ts
[14:50:38.710] 
[14:50:46.698]  ✓ Compiled successfully in 14.0s
[14:50:46.703]    Linting and checking validity of types ...
[14:50:51.368] 
[14:50:51.368] Failed to compile.
[14:50:51.368] 
[14:50:51.368] ./src/app/dashboard/page.tsx
[14:50:51.368] 24:13  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
[14:50:51.368] 
[14:50:51.368] ./src/server/api/routers/matchRequests.ts
[14:50:51.369] 4:34  Error: 'users' is defined but never used.  @typescript-eslint/no-unused-vars
[14:50:51.369] 
[14:50:51.369] ./src/server/api/routers/users.ts
[14:50:51.369] 2:30  Error: 'publicProcedure' is defined but never used.  @typescript-eslint/no-unused-vars
[14:50:51.369] 
[14:50:51.369] ./src/server/db/schema.ts
[14:50:51.369] 1:19  Error: 'serial' is defined but never used.  @typescript-eslint/no-unused-vars
[14:50:51.369] 1:74  Error: 'primaryKey' is defined but never used.  @typescript-eslint/no-unused-vars
[14:50:51.369] 
[14:50:51.369] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[14:50:51.405] Error: Command "npm run build" exited with 1
[14:50:51.649] 
[14:50:54.775] Exiting build container