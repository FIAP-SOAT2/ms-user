/*
  Warnings:

  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84";

-- DropForeignKey
ALTER TABLE "orderproduct" DROP CONSTRAINT "FK_4584c1bdc1844c0067a9aed82d7";

-- DropForeignKey
ALTER TABLE "orderproduct" DROP CONSTRAINT "FK_4584c1bdc1844c0067a9aed82d8";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "orderproduct";

-- DropTable
DROP TABLE "product";

-- DropEnum
DROP TYPE "order_payment_enum";

-- DropEnum
DROP TYPE "order_status_enum";

-- DropEnum
DROP TYPE "product_category_enum";
