-- Modify "categories" table
ALTER TABLE "reorder"."categories" ALTER COLUMN "parent_id" TYPE integer, ADD COLUMN "rank" integer NOT NULL DEFAULT 0;
-- Modify "video_interval_categories" table
ALTER TABLE "reorder"."video_interval_categories" ALTER COLUMN "video_interval_id" TYPE integer, ALTER COLUMN "category_id" TYPE integer;
-- Modify "video_intervals" table
ALTER TABLE "reorder"."video_intervals" ALTER COLUMN "video_id" TYPE integer;
