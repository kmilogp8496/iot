CREATE TABLE `metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`metric_name` text NOT NULL,
	`labels` text,
	`value` real NOT NULL,
	`timestamp` integer NOT NULL
);
