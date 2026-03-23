import "dotenv/config";

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

import { hashSync } from "bcryptjs";
import { SEED_CATEGORY, SEED_FEATURE } from "./consts";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function up() {
  await prisma.user.createMany({
    data: [
      {
        name: "Kirill",
        email: "kirill@gmail.com",
        password: hashSync("12345678", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        name: "Elnar",
        email: "elnar@gmail.com",
        password: hashSync("12345678", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: SEED_CATEGORY,
  });

  await prisma.feature.createMany({
    data: SEED_FEATURE,
  });

  const s01 = await prisma.product.create({
      data: {
        name: "American Truck",
        desc: "Ощутите мощь легендарных американских грузовиков и доставляйте разнообразные грузы по солнечной Калифорнии, песчаной Неваде и величественному Большому Каньону штата Аризона.",
        developer: "SCS Software",
        rating: 3,
        categoryId: 1,
        features: {
          connect: [{ id: 2 }, { id: 3 }],
        },
      },
    }),
    s02 = await prisma.product.create({
      data: {
        name: "Euro Truck",
        desc: "Станьте королем европейских дорог — водителем грузовика, который доставляет важные грузы на немалые расстояния!",
        developer: "SCS Software",
        rating: 2,
        categoryId: 1,
        features: {
          connect: [{ id: 2 }, { id: 3 }],
        },
      },
    }),
    s03 = await prisma.product.create({
      data: {
        name: "Forza Horizon 6",
        desc: "Исследуйте потрясающие пейзажи Японии за рулем любой из более чем 550 реальных машин и станьте настоящей легендой фестиваля Horizon в самом масштабном гоночном приключении в открытом мире.",
        developer: "Playground Games",
        rating: 4,
        categoryId: 1,
        features: {
          connect: [{ id: 2 }, { id: 3 }],
        },
      },
    }),
    s04 = await prisma.product.create({
      data: {
        name: "Farming Simulator 25",
        desc: "Игра «Симулятор фермы 25» приглашает в приятную сельскую жизнь, в одиночку или в совместной игре. Хозяин здесь вы!",
        developer: "GIANTS Software",
        rating: 4,
        categoryId: 1,
        features: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
        },
      },
    }),
    s05 = await prisma.product.create({
      data: {
        name: "EA SPORTS FC™ 26",
        desc: "Клуб ваш в EA SPORTS FC™ 26. Играйте по-своему с обновленным игровым процессом, основанным на отзывах сообщества, испытаниями «Тренер Live», которые привносят свежие сюжетные линии в новый сезон, и архетипами, вдохновленными величайшими игроками.",
        developer: "EA Canada",
        rating: 2,
        categoryId: 2,
        features: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
        },
      },
    }),
    s06 = await prisma.product.create({
      data: {
        name: "F1® 25",
        desc: "Оставьте свой след в мире гонок в F1® 25 — официальной игре чемпионата FIA Formula One World Championship™ 2025 с обновленным режимом «Моя команда», увлекательной третьей главой «Формулы победы» и не только!",
        developer: "Codemasters",
        rating: 4,
        categoryId: 2,
        features: {
          connect: [{ id: 1 }, { id: 2 }],
        },
      },
    }),
    s07 = await prisma.product.create({
      data: {
        name: "BeamNG.drive",
        desc: "Основанный на физике мягких объектов автомобильный симулятор, способный практически на всё.",
        developer: "BeamNG",
        rating: 4,
        categoryId: 2,
        features: {
          connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
        },
      },
    });

  await prisma.productVariant.createMany({
    data: [
      {
        productId: s01.id,
        // Базовая игра
        editionType: 1,
        price: 590,
      },
      {
        productId: s01.id,
        // Игра + набор эксклюзивных скинов или пара доп. уровней
        editionType: 2,
        price: 1990,
      },
      {
        productId: s01.id,
        // Игра + Season Pass + все будущие дополнения + цифровой артбук
        editionType: 3,
        price: 4490,
      },
      //
      {
        productId: s02.id,
        editionType: 1,
        price: 490,
      },
      {
        productId: s02.id,
        editionType: 2,
        price: 1790,
      },
      {
        productId: s02.id,
        editionType: 3,
        price: 4290,
      },
      //
      {
        productId: s03.id,
        editionType: 1,
        price: 490,
      },
      {
        productId: s03.id,
        editionType: 2,
        price: 1490,
      },
      {
        productId: s03.id,
        editionType: 3,
        price: 3490,
      },

      {
        productId: s04.id,
        editionType: 1,
        price: 490,
      },
      {
        productId: s04.id,
        editionType: 2,
        price: 1990,
      },
      {
        productId: s04.id,
        editionType: 3,
        price: 4490,
      },

      {
        productId: s05.id,
        editionType: 1,
        price: 490,
      },
      {
        productId: s05.id,
        editionType: 2,
        price: 1990,
      },
      {
        productId: s05.id,
        editionType: 3,
        price: 4490,
      },

      {
        productId: s06.id,
        editionType: 1,
        price: 490,
      },
      {
        productId: s06.id,
        editionType: 2,
        price: 1990,
      },
      {
        productId: s06.id,
        editionType: 3,
        price: 4490,
      },

      {
        productId: s07.id,
        editionType: 1,
        price: 490,
      },
      {
        productId: s07.id,
        editionType: 2,
        price: 1990,
      },
      {
        productId: s07.id,
        editionType: 3,
        price: 4490,
      },
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        token: "123",
        totalAmount: 0,
      },
      {
        userId: 2,
        token: "113",
        totalAmount: 0,
      },
    ],
  });

  await prisma.cartItem.createMany({
    data: [
      {
        cartId: 1,
        productVariantId: 1,
        quantity: 5,
      },
      {
        cartId: 2,
        productVariantId: 21,
        quantity: 2,
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Feature" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error("Error seeding data:", e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
