CREATE TABLE `measurements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sensor_id` integer NOT NULL,
	`name` text NOT NULL,
	`unit` text NOT NULL,
	`interval` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`sensor_id`) REFERENCES `sensors`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `measurements_sensor_id_idx` ON `measurements` (`sensor_id`);--> statement-breakpoint
CREATE INDEX `measurements_created_at_idx` ON `measurements` (`created_at`);