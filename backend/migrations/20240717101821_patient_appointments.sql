-- Create enum type "patient_status"
CREATE TYPE "reorder"."patient_status" AS ENUM ('active', 'on_hold', 'blacklisted');
-- Create enum type "gender"
CREATE TYPE "reorder"."gender" AS ENUM ('male', 'female');
-- Modify "categories" table
ALTER TABLE "reorder"."categories" ADD CONSTRAINT "categories_name_key" UNIQUE USING INDEX "categories_name_key";
-- Modify "users" table
ALTER TABLE "reorder"."users" ADD CONSTRAINT "users_email_key" UNIQUE USING INDEX "users_email_key";
-- Modify "videos" table
ALTER TABLE "reorder"."videos" ADD CONSTRAINT "videos_youtube_id_key" UNIQUE USING INDEX "videos_youtube_id_key";
-- Create "patients" table
CREATE TABLE "reorder"."patients" ("id" serial NOT NULL, "initials" text NOT NULL, "gender" "reorder"."gender" NOT NULL, "status" "reorder"."patient_status" NOT NULL DEFAULT 'active', PRIMARY KEY ("id"), CONSTRAINT "patients_initials_key" UNIQUE ("initials"));
-- Create "patient_appointments" table
CREATE TABLE "reorder"."patient_appointments" ("id" serial NOT NULL, "start_time" timestamp NOT NULL, "patient_id" integer NOT NULL, PRIMARY KEY ("id"), CONSTRAINT "patient_appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "reorder"."patients" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION);
