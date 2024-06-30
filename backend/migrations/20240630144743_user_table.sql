-- Create "users" table
CREATE TABLE "reorder"."users" ("id" serial NOT NULL, "email" text NOT NULL, "name" text NOT NULL, "photo_url" text NOT NULL, PRIMARY KEY ("id"));
-- Create index "users_email_key" to table: "users"
CREATE UNIQUE INDEX "users_email_key" ON "reorder"."users" ("email");
