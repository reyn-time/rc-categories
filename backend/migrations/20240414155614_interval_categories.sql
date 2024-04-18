-- Modify "video_interval_categories" table
ALTER TABLE "reorder"."video_interval_categories" DROP COLUMN "description";
-- Modify "video_intervals" table
ALTER TABLE "reorder"."video_intervals" ADD COLUMN "description" text NULL;
