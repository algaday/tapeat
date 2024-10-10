-- DropForeignKey
ALTER TABLE "InventoryCountTemplate" DROP CONSTRAINT "InventoryCountTemplate_storegeId_fkey";

-- CreateTable
CREATE TABLE "InventoryCountTemplateStorage" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "storegeId" UUID NOT NULL,
    "inventoryCountTempleteId" UUID NOT NULL,

    CONSTRAINT "InventoryCountTemplateStorage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InventoryCountTemplateStorage" ADD CONSTRAINT "InventoryCountTemplateStorage_storegeId_fkey" FOREIGN KEY ("storegeId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryCountTemplateStorage" ADD CONSTRAINT "InventoryCountTemplateStorage_inventoryCountTempleteId_fkey" FOREIGN KEY ("inventoryCountTempleteId") REFERENCES "InventoryCountTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
