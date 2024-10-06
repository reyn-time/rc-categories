-- Modify "users" table
ALTER TABLE "reorder"."users" ADD COLUMN "user_uuid" uuid NOT NULL DEFAULT gen_random_uuid();
