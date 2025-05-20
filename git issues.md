jpmiles@JPs-MacBook-Pro pickleball-match % git push -u origin feature/project-setup
Enumerating objects: 191, done.
Counting objects: 100% (191/191), done.
Delta compression using up to 14 threads
Compressing objects: 100% (148/148), done.
Writing objects: 100% (159/159), 608.01 KiB | 7.90 MiB/s, done.
Total 159 (delta 50), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (50/50), completed with 12 local objects.
To github-pickleball:PickleballMatch-com/pickballmatch.com.git
   59b4805..b44ea58  feature/project-setup -> feature/project-setup
branch 'feature/project-setup' set up to track 'origin/feature/project-setup'.
jpmiles@JPs-MacBook-Pro pickleball-match % git checkout feature/project-setup
M       Docs/deploy errors vercel.md
M       next.config.ts
Already on 'feature/project-setup'
Your branch is up to date with 'origin/feature/project-setup'.
jpmiles@JPs-MacBook-Pro pickleball-match % git add .
jpmiles@JPs-MacBook-Pro pickleball-match %   git commit -m "fix: Update next.config.ts to ignore ESLint/TypeScript errors during build"
[feature/project-setup 6ae82d2] fix: Update next.config.ts to ignore ESLint/TypeScript errors during build
 2 files changed, 139 insertions(+), 82 deletions(-)
jpmiles@JPs-MacBook-Pro pickleball-match % git push origin feature/project-setup
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Delta compression using up to 14 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (5/5), 2.43 KiB | 2.43 MiB/s, done.
Total 5 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To github-pickleball:PickleballMatch-com/pickballmatch.com.git
   b44ea58..6ae82d2  feature/project-setup -> feature/project-setup
jpmiles@JPs-MacBook-Pro pickleball-match % git checkout develop
  git merge feature/project-setup
  git push origin develop
Switched to branch 'develop'
Your branch is up to date with 'origin/develop'.
Updating 4ab388a..6ae82d2
Fast-forward
 .gitignore                                                          |     2 +
 CLAUDE.md                                                           |   118 +
 Docs/00_PROJECT_CHARTER.md                                          |    65 +
 Docs/{pickleball-prd-v2.md => 01_PRODUCT_REQUIREMENTS.md}           |     0
 Docs/02_USER_FLOWS_AND_WIREFRAMES_OVERVIEW.md                       |    58 +
 Docs/{pickleball-user-flows.md => 02a_USER_FLOWS_DETAIL.md}         |     0
 Docs/03_SYSTEM_ARCHITECTURE.md                                      |   168 +
 Docs/{pickleball-branding-guide.md => 04_BRANDING_AND_UI_GUIDE.md}  |     0
 Docs/05_DEVELOPMENT_STANDARDS.md                                    |   865 +
 Docs/Archive/01-pickleball-match-project-core-intro.md              |    48 +
 Docs/Archive/03-pickleball-match-final-tech-stack.md                |   735 +
 .../06-pickleball-match-project-tracker.md}                         |    39 +-
 .../OLD IGNORE/pickleball-match-implementation-roadmap-Old?.md      |   418 +
 .../OLD IGNORE/pickleball-match-prd-v1-Investor-costs.md}           |     0
 .../OLD IGNORE/pickleball-match-prd-v1.1-more technical.md}         |     0
 Docs/Archive/Roadmap & Tasks/00-agent-persona.md                    |    95 +
 Docs/Archive/Roadmap & Tasks/00-git-workflow-tracker.md             |    69 +
 Docs/Archive/Roadmap & Tasks/00-tasks-dashboard.md                  |   146 +
 Docs/Archive/Roadmap & Tasks/01-tasks-setup-updated.md              |   239 +
 Docs/Archive/Roadmap & Tasks/02-tasks-auth-updated.md               |   216 +
 Docs/Archive/Roadmap & Tasks/03-tasks-profiles-updated.md           |   218 +
 Docs/Archive/Roadmap & Tasks/04-tasks-matching.md                   |   192 +
 Docs/Archive/Roadmap & Tasks/05-tasks-messaging.md                  |   244 +
 Docs/Archive/Roadmap & Tasks/06-tasks-travel.md                     |   251 +
 Docs/Archive/Roadmap & Tasks/07-tasks-premium.md                    |   318 +
 Docs/Archive/Roadmap & Tasks/08-tasks-community.md                  |   338 +
 Docs/Archive/Roadmap & Tasks/09-equipment-tasks.md                  |   169 +
 Docs/Archive/Roadmap & Tasks/10-tournament-tasks.md                 |   142 +
 Docs/Archive/Roadmap & Tasks/11-tasks-pwa-mobile.md                 |   346 +
 Docs/Archive/Roadmap & Tasks/12-tasks-monitoring.md                 |   383 +
 Docs/Archive/Roadmap & Tasks/13-tasks-internationalization.md       |   361 +
 Docs/Archive/Roadmap & Tasks/14-tasks-launch-deployment.md          |   431 +
 Docs/GLOSSARY.md                                                    |    94 +
 Docs/NEXT_AGENT_PROMPT.md                                           |   121 +
 Docs/PROJECT_MEMORY.md                                              |   131 +
 Docs/ROADMAP.md                                                     |   673 +
 Docs/Roadmap & Tasks/clerk-docs.md                                  |   122 +
 Docs/Roadmap & Tasks/vercel-environment-setup.md                    |    99 +
 Docs/TASKS_AND_PROGRESS.md                                          |   579 +
 Docs/deploy errors vercel.md                                        |   131 +
 Docs/pickleball-list of wireframes to create.md                     |    60 -
 .../pickleball-match-list of wireframes to create.md                |    60 +
 Docs/wireframes and mockups/wireframe-chat-interface.html           |   973 +
 Docs/wireframes and mockups/wireframe-city-bulletin-board.html      |   937 +
 Docs/wireframes and mockups/wireframe-club-page.html                |  1178 +
 Docs/wireframes and mockups/wireframe-community-hub.html            |   871 +
 Docs/wireframes and mockups/wireframe-court-connections.html        |   724 +
 .../wireframes and mockups/wireframe-dashboard.html                 |     0
 Docs/wireframes and mockups/wireframe-dating-profile.html           |   852 +
 Docs/wireframes and mockups/wireframe-destination-browser.html      |  1204 +
 Docs/wireframes and mockups/wireframe-discussion-board.html         |  1027 +
 Docs/wireframes and mockups/wireframe-equipment-detail.html         |  1302 +
 Docs/wireframes and mockups/wireframe-equipment-list.html           |   906 +
 Docs/wireframes and mockups/wireframe-equipment-review-form.html    |   827 +
 Docs/wireframes and mockups/wireframe-event-page.html               |  1180 +
 Docs/wireframes and mockups/wireframe-filters-panel.html            |   448 +
 .../wireframes and mockups/wireframe-full-profile-view.html         |     0
 Docs/wireframes and mockups/wireframe-help-support.html             |   717 +
 .../wireframes and mockups/wireframe-homepage-comprehensive.html    |     0
 .../wireframes and mockups/wireframe-homepage-content-rich.html     |     0
 .../wireframes and mockups/wireframe-homepage-hybrid.html           |     0
 .../wireframes and mockups/wireframe-homepage-magazine-style.html   |     0
 .../wireframes and mockups/wireframe-landing-page.html              |     0
 .../wireframes and mockups/wireframe-login-page.html                |     0
 Docs/wireframes and mockups/wireframe-messages-list.html            |   579 +
 Docs/wireframes and mockups/wireframe-new-message-composer.html     |   394 +
 Docs/wireframes and mockups/wireframe-notifications-settings.html   |   777 +
 Docs/wireframes and mockups/wireframe-premium-upgrade.html          |  1052 +
 .../wireframes and mockups/wireframe-profile-edit.html              |     0
 .../wireframes and mockups/wireframe-profile-setup-wizard.html      |     0
 .../wireframes and mockups/wireframe-profile-view.html              |     0
 Docs/wireframes and mockups/wireframe-reach-out-list.html           |   636 +
 .../wireframes and mockups/wireframe-registration-page.html         |     0
 Docs/wireframes and mockups/wireframe-search-results.html           |   848 +
 Docs/wireframes and mockups/wireframe-settings-page.html            |   574 +
 Docs/wireframes and mockups/wireframe-singles-pool-interface.html   |   925 +
 Docs/wireframes and mockups/wireframe-subscription-management.html  |   620 +
 .../wireframes and mockups/wireframe-swipe-interface.html           |     0
 Docs/wireframes and mockups/wireframe-travel-badge-display.html     |   832 +
 Docs/wireframes and mockups/wireframe-travel-plans-creator.html     |   565 +
 NEXT_AGENT_PROMPT.md                                                |    98 +
 README.md                                                           |     8 +-
 codebase.txt                                                        | 56973 ++++++++++++++++++++++++++++
 components.json                                                     |    21 +
 drizzle.config.ts                                                   |     4 +-
 middleware.ts                                                       |    12 -
 next.config.ts                                                      |    25 +-
 package-lock.json                                                   |  2162 +-
 package.json                                                        |    19 +-
 postcss.config.js                                                   |     6 +
 scripts/test-db.js                                                  |    19 +
 scripts/test-db.mjs                                                 |    35 +
 src/app/(auth)/sign-in/[[...sign-in]]/page.tsx                      |     9 +
 src/app/(auth)/sign-up/[[...sign-up]]/page.tsx                      |     9 +
 src/app/(auth)/sso-callback/page.tsx                                |     9 +
 src/app/(protected)/layout.tsx                                      |    13 +
 src/app/(protected)/matches/page.tsx                                |    39 +
 src/app/api/db-test/route.ts                                        |    27 +
 src/app/api/trpc/[trpc]/route.ts                                    |    46 +-
 src/app/dashboard/page.tsx                                          |    25 +-
 src/app/globals.css                                                 |   156 +-
 src/app/layout.tsx                                                  |    14 +-
 src/app/page.tsx                                                    |   192 +-
 src/app/profile/edit/page.tsx                                       |   419 +
 src/app/profile/page.tsx                                            |   167 +
 src/components/auth/AuthModal.tsx                                   |    58 +
 src/components/auth/AuthNav.tsx                                     |    32 +
 src/components/auth/UserDropdown.tsx                                |   106 +
 src/components/common/Button.tsx                                    |    52 +
 src/components/common/Card.tsx                                      |    56 +
 src/components/common/Container.tsx                                 |    28 +
 src/components/common/PageHeader.tsx                                |    33 +
 src/components/common/Section.tsx                                   |    32 +
 src/components/common/index.ts                                      |     5 +
 src/components/layout/Header.tsx                                    |    17 +
 src/components/navigation/Footer.tsx                                |   105 +
 src/components/navigation/Navbar.tsx                                |    81 +
 src/components/profile/ProfileCompletionGuard.tsx                   |    55 +
 src/components/profile/ProfileCompletionIndicator.tsx               |   100 +
 src/components/profile/ProfileCompletionPrompt.tsx                  |   179 +
 src/components/ui/button.tsx                                        |    59 +
 src/components/ui/card.tsx                                          |    92 +
 src/components/ui/dialog.tsx                                        |   135 +
 src/components/ui/dropdown-menu.tsx                                 |   257 +
 src/components/ui/form.tsx                                          |   167 +
 src/components/ui/input.tsx                                         |    21 +
 src/components/ui/label.tsx                                         |    24 +
 src/components/ui/sonner.tsx                                        |    25 +
 src/lib/hooks/useProfileSync.ts                                     |    88 +
 src/lib/trpc/client.ts                                              |     4 +-
 src/lib/trpc/provider.tsx                                           |    33 +-
 src/lib/types/profile.ts                                            |    46 +
 src/lib/utils.ts                                                    |     6 +
 src/lib/utils/profileUtils.ts                                       |   151 +
 src/middleware.ts                                                   |    12 +
 src/server/api/root.ts                                              |     2 +
 src/server/api/routers/matchRequests.ts                             |    30 +-
 src/server/api/routers/profiles.ts                                  |   225 +
 src/server/api/routers/users.ts                                     |    30 +-
 src/server/db/schema.ts                                             |    73 +-
 src/server/trpc/index.ts                                            |    38 +-
 tailwind.config.js                                                  |    69 +
 tailwind.config.ts                                                  |    87 +
 143 files changed, 92460 insertions(+), 352 deletions(-)
 create mode 100644 CLAUDE.md
 create mode 100644 Docs/00_PROJECT_CHARTER.md
 rename Docs/{pickleball-prd-v2.md => 01_PRODUCT_REQUIREMENTS.md} (100%)
 create mode 100644 Docs/02_USER_FLOWS_AND_WIREFRAMES_OVERVIEW.md
 rename Docs/{pickleball-user-flows.md => 02a_USER_FLOWS_DETAIL.md} (100%)
 create mode 100644 Docs/03_SYSTEM_ARCHITECTURE.md
 rename Docs/{pickleball-branding-guide.md => 04_BRANDING_AND_UI_GUIDE.md} (100%)
 create mode 100644 Docs/05_DEVELOPMENT_STANDARDS.md
 create mode 100644 Docs/Archive/01-pickleball-match-project-core-intro.md
 create mode 100644 Docs/Archive/03-pickleball-match-final-tech-stack.md
 rename Docs/{pickleball-project-tracker.md => Archive/06-pickleball-match-project-tracker.md} (87%)
 create mode 100644 Docs/Archive/OLD IGNORE/pickleball-match-implementation-roadmap-Old?.md
 rename Docs/{pickleball-prd-v1-Investor-costs.md => Archive/OLD IGNORE/pickleball-match-prd-v1-Investor-costs.md} (100%)
 rename Docs/{pickleball-prd-v1.1-more technical.md => Archive/OLD IGNORE/pickleball-match-prd-v1.1-more technical.md} (100%)
 create mode 100644 Docs/Archive/Roadmap & Tasks/00-agent-persona.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/00-git-workflow-tracker.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/00-tasks-dashboard.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/01-tasks-setup-updated.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/02-tasks-auth-updated.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/03-tasks-profiles-updated.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/04-tasks-matching.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/05-tasks-messaging.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/06-tasks-travel.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/07-tasks-premium.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/08-tasks-community.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/09-equipment-tasks.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/10-tournament-tasks.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/11-tasks-pwa-mobile.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/12-tasks-monitoring.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/13-tasks-internationalization.md
 create mode 100644 Docs/Archive/Roadmap & Tasks/14-tasks-launch-deployment.md
 create mode 100644 Docs/GLOSSARY.md
 create mode 100644 Docs/NEXT_AGENT_PROMPT.md
 create mode 100644 Docs/PROJECT_MEMORY.md
 create mode 100644 Docs/ROADMAP.md
 create mode 100644 Docs/Roadmap & Tasks/clerk-docs.md
 create mode 100644 Docs/Roadmap & Tasks/vercel-environment-setup.md
 create mode 100644 Docs/TASKS_AND_PROGRESS.md
 create mode 100644 Docs/deploy errors vercel.md
 delete mode 100644 Docs/pickleball-list of wireframes to create.md
 create mode 100644 Docs/wireframes and mockups/pickleball-match-list of wireframes to create.md
 create mode 100644 Docs/wireframes and mockups/wireframe-chat-interface.html
 create mode 100644 Docs/wireframes and mockups/wireframe-city-bulletin-board.html
 create mode 100644 Docs/wireframes and mockups/wireframe-club-page.html
 create mode 100644 Docs/wireframes and mockups/wireframe-community-hub.html
 create mode 100644 Docs/wireframes and mockups/wireframe-court-connections.html
 rename wireframes and mockups/dashboard-wireframe.html => Docs/wireframes and mockups/wireframe-dashboard.html (100%)
 create mode 100644 Docs/wireframes and mockups/wireframe-dating-profile.html
 create mode 100644 Docs/wireframes and mockups/wireframe-destination-browser.html
 create mode 100644 Docs/wireframes and mockups/wireframe-discussion-board.html
 create mode 100644 Docs/wireframes and mockups/wireframe-equipment-detail.html
 create mode 100644 Docs/wireframes and mockups/wireframe-equipment-list.html
 create mode 100644 Docs/wireframes and mockups/wireframe-equipment-review-form.html
 create mode 100644 Docs/wireframes and mockups/wireframe-event-page.html
 create mode 100644 Docs/wireframes and mockups/wireframe-filters-panel.html
 rename wireframes and mockups/full-profile-view-wireframe.html => Docs/wireframes and mockups/wireframe-full-profile-view.html (100%)
 create mode 100644 Docs/wireframes and mockups/wireframe-help-support.html
 rename wireframes and mockups/homepage-wireframe-comprehensive.html => Docs/wireframes and mockups/wireframe-homepage-comprehensive.html (100%)
 rename wireframes and mockups/homepage-content-rich.html => Docs/wireframes and mockups/wireframe-homepage-content-rich.html (100%)
 rename wireframes and mockups/homepage-hybrid-wireframe.html => Docs/wireframes and mockups/wireframe-homepage-hybrid.html (100%)
 rename wireframes and mockups/homepage-magazine-style.html => Docs/wireframes and mockups/wireframe-homepage-magazine-style.html (100%)
 rename wireframes and mockups/landing-page-wireframe.html => Docs/wireframes and mockups/wireframe-landing-page.html (100%)
 rename wireframes and mockups/login-page-wireframe.html => Docs/wireframes and mockups/wireframe-login-page.html (100%)
 create mode 100644 Docs/wireframes and mockups/wireframe-messages-list.html
 create mode 100644 Docs/wireframes and mockups/wireframe-new-message-composer.html
 create mode 100644 Docs/wireframes and mockups/wireframe-notifications-settings.html
 create mode 100644 Docs/wireframes and mockups/wireframe-premium-upgrade.html
 rename wireframes and mockups/profile-edit-wireframe.html => Docs/wireframes and mockups/wireframe-profile-edit.html (100%)
 rename wireframes and mockups/profile-setup-wizard.html => Docs/wireframes and mockups/wireframe-profile-setup-wizard.html (100%)
 rename wireframes and mockups/profile-view-wireframe.html => Docs/wireframes and mockups/wireframe-profile-view.html (100%)
 create mode 100644 Docs/wireframes and mockups/wireframe-reach-out-list.html
 rename wireframes and mockups/registration-page-wireframe.html => Docs/wireframes and mockups/wireframe-registration-page.html (100%)
 create mode 100644 Docs/wireframes and mockups/wireframe-search-results.html
 create mode 100644 Docs/wireframes and mockups/wireframe-settings-page.html
 create mode 100644 Docs/wireframes and mockups/wireframe-singles-pool-interface.html
 create mode 100644 Docs/wireframes and mockups/wireframe-subscription-management.html
 rename wireframes and mockups/swipe-interface-wireframe.html => Docs/wireframes and mockups/wireframe-swipe-interface.html (100%)
 create mode 100644 Docs/wireframes and mockups/wireframe-travel-badge-display.html
 create mode 100644 Docs/wireframes and mockups/wireframe-travel-plans-creator.html
 create mode 100644 NEXT_AGENT_PROMPT.md
 create mode 100644 codebase.txt
 create mode 100644 components.json
 delete mode 100644 middleware.ts
 create mode 100644 postcss.config.js
 create mode 100644 scripts/test-db.js
 create mode 100644 scripts/test-db.mjs
 create mode 100644 src/app/(auth)/sign-in/[[...sign-in]]/page.tsx
 create mode 100644 src/app/(auth)/sign-up/[[...sign-up]]/page.tsx
 create mode 100644 src/app/(auth)/sso-callback/page.tsx
 create mode 100644 src/app/(protected)/layout.tsx
 create mode 100644 src/app/(protected)/matches/page.tsx
 create mode 100644 src/app/api/db-test/route.ts
 create mode 100644 src/app/profile/edit/page.tsx
 create mode 100644 src/app/profile/page.tsx
 create mode 100644 src/components/auth/AuthModal.tsx
 create mode 100644 src/components/auth/AuthNav.tsx
 create mode 100644 src/components/auth/UserDropdown.tsx
 create mode 100644 src/components/common/Button.tsx
 create mode 100644 src/components/common/Card.tsx
 create mode 100644 src/components/common/Container.tsx
 create mode 100644 src/components/common/PageHeader.tsx
 create mode 100644 src/components/common/Section.tsx
 create mode 100644 src/components/common/index.ts
 create mode 100644 src/components/layout/Header.tsx
 create mode 100644 src/components/navigation/Footer.tsx
 create mode 100644 src/components/navigation/Navbar.tsx
 create mode 100644 src/components/profile/ProfileCompletionGuard.tsx
 create mode 100644 src/components/profile/ProfileCompletionIndicator.tsx
 create mode 100644 src/components/profile/ProfileCompletionPrompt.tsx
 create mode 100644 src/components/ui/button.tsx
 create mode 100644 src/components/ui/card.tsx
 create mode 100644 src/components/ui/dialog.tsx
 create mode 100644 src/components/ui/dropdown-menu.tsx
 create mode 100644 src/components/ui/form.tsx
 create mode 100644 src/components/ui/input.tsx
 create mode 100644 src/components/ui/label.tsx
 create mode 100644 src/components/ui/sonner.tsx
 create mode 100644 src/lib/hooks/useProfileSync.ts
 create mode 100644 src/lib/types/profile.ts
 create mode 100644 src/lib/utils.ts
 create mode 100644 src/lib/utils/profileUtils.ts
 create mode 100644 src/middleware.ts
 create mode 100644 src/server/api/routers/profiles.ts
 create mode 100644 tailwind.config.js
 create mode 100644 tailwind.config.ts
To github-pickleball:PickleballMatch-com/pickballmatch.com.git
 ! [rejected]        develop -> develop (fetch first)
error: failed to push some refs to 'github-pickleball:PickleballMatch-com/pickballmatch.com.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
jpmiles@JPs-MacBook-Pro pickleball-match % 