/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from '@prisma/client';
import user from './seed-data/user.json';
import restaurantOwner from './seed-data/restaurant-owner.json';
import restaurant from './seed-data/restaurant.json';
import restaurantBranch from './seed-data/restaurant-branch.json';
import ingredient from './seed-data/ingredient.json';

import storage from './seed-data/storage.json';

import storageItem from './seed-data/storage-item.json';

import inventoryCountTemplate from './seed-data/inventory-count-template.json';

import inventoryCountTemplateStorage from './seed-data/inventory-count-template-storage.json';

const prisma = new PrismaClient();

async function main() {
  console.log(user);
  const userPromise = user.map((user) =>
    prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    }),
  );

  const restaurantOwnerPromise = restaurantOwner.map((restaurantOwner) =>
    prisma.restaurantOwner.upsert({
      where: { id: restaurantOwner.id },
      update: restaurantOwner,
      create: restaurantOwner,
    }),
  );
  const restaurantPromise = restaurant.map((restaurant) =>
    prisma.restaurant.upsert({
      where: { id: restaurant.id },
      update: restaurant,
      create: restaurant,
    }),
  );
  const restaurantBranchPromise = restaurantBranch.map((restaurantBranch) =>
    prisma.restaurantBranch.upsert({
      where: { id: restaurantBranch.id },
      update: restaurantBranch,
      create: restaurantBranch,
    }),
  );
  const ingredientPromise = ingredient.map((ingredient) =>
    prisma.ingredient.upsert({
      where: { id: ingredient.id },
      update: ingredient,
      create: ingredient,
    }),
  );
  const storagePromise = storage.map((storage) =>
    prisma.storage.upsert({
      where: { id: storage.id },
      update: storage,
      create: storage,
    }),
  );
  const storageItemPromise = storageItem.map((storageItem) =>
    prisma.storageItem.upsert({
      where: { id: storageItem.id },
      update: storageItem,
      create: storageItem,
    }),
  );

  const inventoryCountTemplatePromise = inventoryCountTemplate.map(
    (inventoryCountTemplate) =>
      prisma.inventoryCountTemplate.upsert({
        where: { id: inventoryCountTemplate.id },
        update: inventoryCountTemplate,
        create: inventoryCountTemplate,
      }),
  );

  const inventoryCountTemplateStoragePromise =
    inventoryCountTemplateStorage.map((inventoryCountTemplateStorage) =>
      prisma.inventoryCountTemplateStorage.upsert({
        where: { id: inventoryCountTemplateStorage.id },
        update: inventoryCountTemplateStorage,
        create: inventoryCountTemplateStorage,
      }),
    );

  await prisma.$transaction([
    ...userPromise,
    ...restaurantOwnerPromise,
    ...restaurantPromise,
    ...restaurantBranchPromise,
    ...ingredientPromise,
    ...storagePromise,
    ...storageItemPromise,
    ...inventoryCountTemplatePromise,
    ...inventoryCountTemplateStoragePromise,
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
