ALTER TABLE "posts_table" RENAME TO "products_table";--> statement-breakpoint
ALTER TABLE "inventory_table" DROP CONSTRAINT "inventory_table_product_id_posts_table_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory_table" ADD CONSTRAINT "inventory_table_product_id_products_table_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
