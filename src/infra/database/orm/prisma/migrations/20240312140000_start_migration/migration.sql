-- CreateEnum
CREATE TYPE "order_payment_enum" AS ENUM ('0', '1', '2', '3');

-- CreateEnum
CREATE TYPE "order_status_enum" AS ENUM ('0', '1', '2', '3', '4', '5');

-- CreateEnum
CREATE TYPE "product_category_enum" AS ENUM ('0', '1', '2', '3', '4');

-- CreateEnum
CREATE TYPE "user_profile_enum" AS ENUM ('0', '1', '2');

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "status" "order_status_enum" NOT NULL,
    "payment" "order_payment_enum" NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "paidId" DECIMAL(10,0),
    "note" VARCHAR(100),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderproduct" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER,
    "quantity" INTEGER,
    "price" INTEGER,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "PK_4584c1bdc1844c0067a9aed82d7" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "category" "product_category_enum" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(100),
    "cpf" VARCHAR(100),
    "profile" "user_profile_enum" NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_22cc43e9a74d7498546e9a63e77" ON "product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_e12875dfb3b1d92d7d7c5377e22" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_8e1f623798118e629b46a9e6299" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_a6235b5ef0939d8deaad755fc87" ON "user"("cpf");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderproduct" ADD CONSTRAINT "FK_4584c1bdc1844c0067a9aed82d7" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderproduct" ADD CONSTRAINT "FK_4584c1bdc1844c0067a9aed82d8" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
