-- Modify "video_interval_categories" table
ALTER TABLE "reorder"."video_interval_categories" DROP CONSTRAINT "video_interval_categories_video_interval_id_fkey", ADD CONSTRAINT "video_interval_categories_video_interval_id_fkey" FOREIGN KEY ("video_interval_id") REFERENCES "reorder"."video_intervals" ("id") ON UPDATE NO ACTION ON DELETE CASCADE;
