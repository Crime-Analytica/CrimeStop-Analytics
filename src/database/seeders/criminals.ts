import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedCrimnals (): Promise<void> {
  await prisma.criminal.create({
    data: {
      firstName: 'Dudus',
      lastName: 'Coke',
      wantedFor: ['Drug Trafficking', 'murder', 'theift', 'illegal possesion of firearms'],
      imageUrl: ['https://ucarecdn.com/8479228f-ff1e-44f9-8d18-3338f6de2d61/Christopher_Coke.jpg', 'https://ucarecdn.com/614ab76c-92ae-4e35-b248-7401694574b0/download.jpeg',
        'https://ucarecdn.com/a7a02ffd-0cc6-4f26-8401-e7ed166a9c4e/enf1b8aeeb90e87d86cd6bf72988291f00.jpg', 'https://ucarecdn.com/eb738230-48cf-492f-9137-b43235545498/duduscustody20100626c.jpg',
        'https://ucarecdn.com/bc7a5876-2957-4256-b3c9-568d7edb27ff/_47905269_0093547561.jpg']
    }
  })
}

void seedCrimnals()
