-- Modify "videos" table
ALTER TABLE "reorder"."videos" ADD COLUMN "editor" integer NULL, ADD CONSTRAINT "videos_editor_fkey" FOREIGN KEY ("editor") REFERENCES "reorder"."users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;
