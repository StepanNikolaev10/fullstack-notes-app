/*
  Warnings:

  - The values [DEFAULT,ARCHIVED,TRASHED] on the enum `status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "status_new" AS ENUM ('default', 'archived', 'trashed');
ALTER TABLE "public"."notes" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "notes" ALTER COLUMN "status" TYPE "status_new" USING ("status"::text::"status_new");
ALTER TYPE "status" RENAME TO "status_old";
ALTER TYPE "status_new" RENAME TO "status";
DROP TYPE "public"."status_old";
ALTER TABLE "notes" ALTER COLUMN "status" SET DEFAULT 'default';
COMMIT;

-- AlterTable
ALTER TABLE "notes" ALTER COLUMN "status" SET DEFAULT 'default';
