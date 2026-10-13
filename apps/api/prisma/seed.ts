import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('template123!', 10);

  await prisma.demoItem.deleteMany();
  await prisma.user.deleteMany();

  const demoUser = await prisma.user.create({
    data: {
      username: 'demo',
      name: 'Usuário Demo',
      passwordHash,
    },
  });

  await prisma.demoItem.createMany({
    data: [
      {
        title: 'Primeiro item de exemplo',
        description: 'Substitua este conteúdo pela regra de negócio do seu domínio.',
        authorId: demoUser.id,
      },
      {
        title: 'Segundo item de exemplo',
        description: 'Use esta feature como referência de camadas (route → service → repository).',
        authorId: demoUser.id,
      },
    ],
  });

  console.log('Seed completed:', {
    user: demoUser.username,
    passwordHint: 'template123!',
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
