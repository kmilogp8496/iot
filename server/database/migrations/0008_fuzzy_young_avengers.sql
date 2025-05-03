PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sensor_credentials` (
	`sensor_id` integer PRIMARY KEY NOT NULL,
	`api_key` text NOT NULL,
	FOREIGN KEY (`sensor_id`) REFERENCES `sensors`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_sensor_credentials`("sensor_id", "api_key") SELECT "sensor_id", "api_key" FROM `sensor_credentials`;--> statement-breakpoint
DROP TABLE `sensor_credentials`;--> statement-breakpoint
ALTER TABLE `__new_sensor_credentials` RENAME TO `sensor_credentials`;--> statement-breakpoint
PRAGMA foreign_keys=ON;