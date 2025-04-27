CREATE TABLE `sensor_credentials` (
	`sensor_id` integer NOT NULL,
	`api_key` text NOT NULL,
	FOREIGN KEY (`sensor_id`) REFERENCES `sensors`(`id`) ON UPDATE no action ON DELETE cascade
);
