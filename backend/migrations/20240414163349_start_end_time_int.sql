-- Modify "video_intervals" table
ALTER TABLE "reorder"."video_intervals"
ALTER COLUMN "start_time" TYPE integer USING 0::INT,
    ALTER COLUMN "end_time" TYPE integer USING 0::INT,
    ALTER COLUMN "end_time"
SET NOT NULL;