-- Add new schema named "reorder"
CREATE SCHEMA "reorder";
-- Create enum type "video_status"
CREATE TYPE "reorder"."video_status" AS ENUM ('approved', 'archived', 'pending');
-- Create "categories" table
CREATE TABLE "reorder"."categories" ("id" bigserial NOT NULL, "name" text NOT NULL, "description" text NULL, "parent_id" bigint NULL, PRIMARY KEY ("id"), CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "reorder"."categories" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION);
-- Create index "categories_name_key" to table: "categories"
CREATE UNIQUE INDEX "categories_name_key" ON "reorder"."categories" ("name");
-- Create "videos" table
CREATE TABLE "reorder"."videos" ("id" bigserial NOT NULL, "name" text NOT NULL, "youtube_id" text NOT NULL, "created_at" timestamp NOT NULL DEFAULT now(), "status" "reorder"."video_status" NOT NULL DEFAULT 'pending', PRIMARY KEY ("id"));
-- Create index "videos_youtube_id_key" to table: "videos"
CREATE UNIQUE INDEX "videos_youtube_id_key" ON "reorder"."videos" ("youtube_id");
-- Create "video_intervals" table
CREATE TABLE "reorder"."video_intervals" ("id" bigserial NOT NULL, "video_id" bigint NOT NULL, "start_time" time NOT NULL, "end_time" time NULL, PRIMARY KEY ("id"), CONSTRAINT "video_intervals_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "reorder"."videos" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION);
-- Create "video_interval_categories" table
CREATE TABLE "reorder"."video_interval_categories" ("id" bigserial NOT NULL, "video_interval_id" bigint NOT NULL, "category_id" bigint NOT NULL, "description" text NULL, PRIMARY KEY ("id"), CONSTRAINT "video_interval_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "reorder"."categories" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT "video_interval_categories_video_interval_id_fkey" FOREIGN KEY ("video_interval_id") REFERENCES "reorder"."video_intervals" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION);
