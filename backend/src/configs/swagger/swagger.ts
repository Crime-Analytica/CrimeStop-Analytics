export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'CrimeStop-Analytics APIs Document',
    description: 'API for Public safety in jamaica',
    termsOfService: '',
    contact: {
      name: 'Garret Tomlin',
      email: 'garrettomlin.code@gmail.com',
      url: 'https://crimestop-analytics.com'
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
  ],
  apis: ['../../routers/*.ts'],
  definitions: {
    MissingPerson: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string'
        },
        lastName: {
          type: 'string'
        },
        lastSeen: {
          type: 'string'
        },
        age: {
          type: 'integer'
        },
        dateMissing: {
          type: 'string'
        },
        imageUrl: {
          type: 'string'
        },
        civilianId: {
          type: 'integer'
        }
      },
      required: [
        'firstName',
        'lastName',
        'lastSeen',
        'age',
        'dateMissing',
        'civilianId'
      ]
    }
  }
}
