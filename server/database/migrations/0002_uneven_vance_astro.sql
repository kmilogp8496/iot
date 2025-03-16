CREATE TABLE `sensors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`organization_id` integer NOT NULL,
	`created_by` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`location` text NOT NULL,
	`measurement_unit` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `sensors_organization_id_idx` ON `sensors` (`organization_id`);--> statement-breakpoint
CREATE INDEX `sensors_created_by_idx` ON `sensors` (`created_by`);--> statement-breakpoint
CREATE INDEX `sensors_measurement_unit_idx` ON `sensors` (`measurement_unit`);