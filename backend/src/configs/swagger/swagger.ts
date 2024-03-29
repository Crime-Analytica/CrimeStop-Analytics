import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'CrimeStop-Analytica APIs Document',
    description: 'Revolutionizing the way we fight crime',
    termsOfService: '',
    contact: {
      name: 'Crime Analytica',
      email: 'garrettomlin.code@gmail.com',
      url: 'https://crimestop-analytics.com'
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:80'
    }
  ]
}

export const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Crime Analytica',
  customfavIcon: ''
}

export const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: swaggerDocument,
  apis: ['./src/controllers/stayAlert/getCriminals.ts',
    './src/controllers/crimeStats/crimeStats.ts',
    './src/controllers/admin/distressSignals.ts',
    './src/controllers/admin/report.ts',
    './src/controllers/stayAlert/getMissingPerson.ts',
    './src/controllers/stayAlert/missingPersons.ts',
    './src/controllers/stayAlert/panic.ts',
    './src/controllers/stayAlert/report.ts',
    './src/controllers/admin/postCriminals.ts',
    './src/controllers/auth/signIn.ts',
    './src/controllers/auth/signUp.ts',
    './src/controllers/visaVault/visaVault.ts'

  ]
})
