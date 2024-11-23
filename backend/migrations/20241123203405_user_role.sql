-- Create enum type "user_role"
CREATE TYPE "reorder"."user_role" AS ENUM ('admin', 'nobody');
-- Modify "users" table
ALTER TABLE "reorder"."users" ADD COLUMN "role" "reorder"."user_role" NOT NULL DEFAULT 'admin';
