PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_measurements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sensor_id` integer NOT NULL,
	`name` text NOT NULL,
	`unit` text NOT NULL,
	`metric_name` text NOT NULL,
	`interval` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`sensor_id`) REFERENCES `sensors`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_measurements`("id", "sensor_id", "name", "unit", "metric_name", "interval", "created_at", "updated_at") SELECT "id", "sensor_id", "name", "unit", "metric_name", "interval", "created_at", "updated_at" FROM `measurements`;--> statement-breakpoint
DROP TABLE `measurements`;--> statement-breakpoint
ALTER TABLE `__new_measurements` RENAME TO `measurements`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `measurements_sensor_id_idx` ON `measurements` (`sensor_id`);--> statement-breakpoint
CREATE INDEX `measurements_created_at_idx` ON `measurements` (`created_at`);--> statement-breakpoint
CREATE TABLE `__new_organizations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_organizations`("id", "name", "description", "is_active", "created_at", "updated_at") SELECT "id", "name", "description", "is_active", "created_at", "updated_at" FROM `organizations`;--> statement-breakpoint
DROP TABLE `organizations`;--> statement-breakpoint
ALTER TABLE `__new_organizations` RENAME TO `organizations`;--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_name_unique` ON `organizations` (`name`);--> statement-breakpoint
CREATE TABLE `__new_sensors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`organization_id` integer NOT NULL,
	`created_by` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`location` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_sensors`("id", "organization_id", "created_by", "name", "description", "location", "created_at", "updated_at") SELECT "id", "organization_id", "created_by", "name", "description", "location", "created_at", "updated_at" FROM `sensors`;--> statement-breakpoint
DROP TABLE `sensors`;--> statement-breakpoint
ALTER TABLE `__new_sensors` RENAME TO `sensors`;--> statement-breakpoint
CREATE INDEX `sensors_organization_id_idx` ON `sensors` (`organization_id`);--> statement-breakpoint
CREATE INDEX `sensors_created_by_idx` ON `sensors` (`created_by`);--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`organization_id` integer NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`avatar` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "organization_id", "email", "name", "avatar", "created_at", "updated_at") SELECT "id", "organization_id", "email", "name", "avatar", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);