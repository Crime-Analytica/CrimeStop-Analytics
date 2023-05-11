
```
backend
├─ .eslintrc.json
├─ .gcloudignore
├─ .gitignore
├─ .prettierrc.json
├─ @types
│  └─ xss-clean
│     └─ index.d.ts
├─ app.ts
├─ app.yaml
├─ docker-compose.yaml
├─ Dockerfile.dev
├─ jest.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ configs
│  │  ├─ passportConfig.ts
│  │  └─ swagger
│  │     └─ swagger.ts
│  ├─ controllers
│  │  ├─ admin
│  │  │  ├─ DistressSignals.ts
│  │  │  ├─ postCriminals.ts
│  │  │  ├─ report.ts
│  │  │  └─ __test__
│  │  │     └─ getCriminal.test.ts
│  │  ├─ auth
│  │  │  ├─ signIn.ts
│  │  │  ├─ signUp.ts
│  │  │  └─ __test__
│  │  │     ├─ currentUser.test.ts
│  │  │     ├─ signIn.test.ts
│  │  │     ├─ signOut.test.ts
│  │  │     └─ signUp.test.ts
│  │  ├─ crimeStats
│  │  │  ├─ crimeStats.ts
│  │  │  └─ __test__
│  │  │     └─ crimeStats.test.ts
│  │  ├─ forum
│  │  │  ├─ addForum.ts
│  │  │  ├─ forum.ts
│  │  │  ├─ webSocket.ts
│  │  │  └─ __test__
│  │  │     └─ forum.test.ts
│  │  ├─ healthCheckController.ts
│  │  └─ stayAlert
│  │     ├─ getCriminals.ts
│  │     ├─ getMissingPerson.ts
│  │     ├─ missingPersons.ts
│  │     ├─ panic.ts
│  │     └─ report.ts
│  ├─ database
│  │  ├─ prisma
│  │  │  ├─ migrations
│  │  │  │  ├─ 20230317144826_updated
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230321144115_updates
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230321162745_updated
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230321171305_updated
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230329223640_updates
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230329224104_new
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230329231328_updated
│  │  │  │  │  └─ migration.sql
│  │  │  │  └─ 20230413134000_new
│  │  │  │     └─ migration.sql
│  │  │  └─ schema.prisma
│  │  └─ seeders
│  │     ├─ admins.ts
│  │     └─ criminals.ts
│  ├─ helpers
│  │  ├─ criminalHelpers.ts
│  │  ├─ distressSignalHelpers.ts
│  │  ├─ forumHelpers.ts
│  │  ├─ missingPersonHelpers.ts
│  │  ├─ postHelpers.ts
│  │  ├─ reportHelpers.ts
│  │  ├─ userHelpers.ts
│  │  └─ __test__
│  ├─ interfaces
│  │  ├─ civillianInterface.ts
│  │  ├─ criminalInterface.ts
│  │  ├─ distressSignalInterface.ts
│  │  ├─ forumInterface.ts
│  │  ├─ missingPersonInterface.ts
│  │  ├─ policeInterface.ts
│  │  ├─ postInterface.ts
│  │  ├─ reportInterface.ts
│  │  └─ userInterface.ts
│  ├─ middleware
│  │  ├─ authenticator.ts
│  │  └─ errorHandler.ts
│  ├─ routers
│  │  ├─ adminRouter.ts
│  │  ├─ authRouter.ts
│  │  ├─ crimeStatsRouter.ts
│  │  ├─ forumRouter.ts
│  │  └─ stayAlertRouter.ts
│  ├─ services
│  │  ├─ cluster.ts
│  │  ├─ crimeStatsScraper.ts
│  │  ├─ loggerManager.ts
│  │  └─ socket.ts
│  ├─ test
│  │  └─ setUp.ts
│  ├─ utils
│  │  ├─ prismaInstance.ts
│  │  └─ rateLimiting.ts
│  └─ validations
│     ├─ index.ts
│     └─ schemas
│        ├─ criminalSchema.ts
│        ├─ disstressSignalSchema.ts
│        ├─ missingPersonSchema.ts
│        ├─ reportSchema.ts
│        ├─ signInSchema.ts
│        └─ signUpSchema.ts
└─ tsconfig.json

```
```
backend
├─ .eslintrc.json
├─ .gcloudignore
├─ .gitignore
├─ .prettierrc.json
├─ @types
│  └─ xss-clean
│     └─ index.d.ts
├─ app.ts
├─ app.yaml
├─ docker-compose.yaml
├─ Dockerfile.dev
├─ jest.config.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ configs
│  │  ├─ passportConfig.ts
│  │  └─ swagger
│  │     └─ swagger.ts
│  ├─ controllers
│  │  ├─ admin
│  │  │  ├─ DistressSignals.ts
│  │  │  ├─ postCriminals.ts
│  │  │  ├─ report.ts
│  │  │  └─ __test__
│  │  │     └─ getCriminal.test.ts
│  │  ├─ auth
│  │  │  ├─ signIn.ts
│  │  │  ├─ signUp.ts
│  │  │  └─ __test__
│  │  │     ├─ currentUser.test.ts
│  │  │     ├─ signIn.test.ts
│  │  │     ├─ signOut.test.ts
│  │  │     └─ signUp.test.ts
│  │  ├─ crimeStats
│  │  │  ├─ crimeStats.ts
│  │  │  └─ __test__
│  │  │     └─ crimeStats.test.ts
│  │  ├─ forum
│  │  │  ├─ addForum.ts
│  │  │  ├─ forum.ts
│  │  │  ├─ webSocket.ts
│  │  │  └─ __test__
│  │  │     └─ forum.test.ts
│  │  ├─ healthCheckController.ts
│  │  └─ stayAlert
│  │     ├─ getCriminals.ts
│  │     ├─ getMissingPerson.ts
│  │     ├─ missingPersons.ts
│  │     ├─ panic.ts
│  │     └─ report.ts
│  ├─ database
│  │  ├─ prisma
│  │  │  ├─ migrations
│  │  │  │  ├─ 20230317144826_updated
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230321144115_updates
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230321162745_updated
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230321171305_updated
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230329223640_updates
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230329224104_new
│  │  │  │  │  └─ migration.sql
│  │  │  │  ├─ 20230329231328_updated
│  │  │  │  │  └─ migration.sql
│  │  │  │  └─ 20230413134000_new
│  │  │  │     └─ migration.sql
│  │  │  └─ schema.prisma
│  │  └─ seeders
│  │     ├─ admins.ts
│  │     └─ criminals.ts
│  ├─ helpers
│  │  ├─ criminalHelpers.ts
│  │  ├─ distressSignalHelpers.ts
│  │  ├─ forumHelpers.ts
│  │  ├─ missingPersonHelpers.ts
│  │  ├─ postHelpers.ts
│  │  ├─ reportHelpers.ts
│  │  ├─ userHelpers.ts
│  │  └─ __test__
│  ├─ interfaces
│  │  ├─ civillianInterface.ts
│  │  ├─ criminalInterface.ts
│  │  ├─ distressSignalInterface.ts
│  │  ├─ forumInterface.ts
│  │  ├─ missingPersonInterface.ts
│  │  ├─ policeInterface.ts
│  │  ├─ postInterface.ts
│  │  ├─ reportInterface.ts
│  │  └─ userInterface.ts
│  ├─ middleware
│  │  ├─ authenticator.ts
│  │  └─ errorHandler.ts
│  ├─ routers
│  │  ├─ adminRouter.ts
│  │  ├─ authRouter.ts
│  │  ├─ crimeStatsRouter.ts
│  │  ├─ forumRouter.ts
│  │  └─ stayAlertRouter.ts
│  ├─ services
│  │  ├─ cluster.ts
│  │  ├─ crimeStatsScraper.ts
│  │  ├─ loggerManager.ts
│  │  └─ socket.ts
│  ├─ test
│  │  └─ setUp.ts
│  ├─ utils
│  │  ├─ prismaInstance.ts
│  │  └─ rateLimiting.ts
│  └─ validations
│     ├─ index.ts
│     └─ schemas
│        ├─ criminalSchema.ts
│        ├─ disstressSignalSchema.ts
│        ├─ missingPersonSchema.ts
│        ├─ reportSchema.ts
│        ├─ signInSchema.ts
│        └─ signUpSchema.ts
└─ tsconfig.json

```