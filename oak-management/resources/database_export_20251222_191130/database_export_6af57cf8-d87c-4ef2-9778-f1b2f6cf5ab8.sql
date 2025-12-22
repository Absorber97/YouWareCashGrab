PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE es_system__db_migrations(
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO "es_system__db_migrations" VALUES(1,'0000_lazy_menace.sql','2025-12-22 19:10:59');
CREATE TABLE `es_system__auth_config` (
	`key` text PRIMARY KEY NOT NULL,
	`data` text DEFAULT '{}',
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
INSERT INTO "es_system__auth_config" VALUES('default','{"disableSignUp":false,"enableAnonymous":false,"providerEmailPassword":{"enabled":true,"config":{"minPasswordLength":8,"requireEmailVerification":false,"requirePasswordResetEmailVerification":false,"revokeSessionsOnPasswordReset":false}},"providerGoogle":{"enabled":false,"config":{}}}',1766430663219,1766430663187);
CREATE TABLE `es_system__auth_account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `es_system__auth_user`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO "es_system__auth_account" VALUES('es-admin-account-00000000-0000-0001','_es_admin@edge-spark.local','credential','es-admin-00000000-0000-0000-0000-000000000001',NULL,NULL,NULL,NULL,NULL,NULL,'$2a$10$UNUSED_PASSWORD_PLACEHOLDER_FOR_ADMIN_USER',1766430659859,1766430659859);
CREATE TABLE `es_system__auth_session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	`impersonated_by` text,
	FOREIGN KEY (`user_id`) REFERENCES `es_system__auth_user`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO "es_system__auth_session" VALUES('es-admin-session-00000000-0000-0001',32503679999999,'f1dd4e43efb1e9bd2c84f615fe3f0629956730ff2b7246f60119df0a8f0e160d',1766430659859,1766430659859,NULL,NULL,'es-admin-00000000-0000-0000-0000-000000000001',NULL);
CREATE TABLE `es_system__auth_user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`is_anonymous` integer DEFAULT false,
	`__internal_a` text,
	`banned` integer DEFAULT false,
	`ban_reason` text,
	`ban_expires` integer,
	`last_login_at` integer
);
INSERT INTO "es_system__auth_user" VALUES('es-admin-00000000-0000-0000-0000-000000000001','_es_admin','_es_admin@edge-spark.local',1,NULL,1766430659859,1766430659859,0,'esa',0,NULL,NULL,NULL);
CREATE TABLE `es_system__auth_verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" VALUES('es_system__db_migrations',1);
CREATE INDEX `es_system__auth_account_userId_idx` ON `es_system__auth_account` (`user_id`);
CREATE UNIQUE INDEX `es_system__auth_session_token_unique` ON `es_system__auth_session` (`token`);
CREATE INDEX `es_system__auth_session_userId_idx` ON `es_system__auth_session` (`user_id`);
CREATE UNIQUE INDEX `es_system__auth_user_email_unique` ON `es_system__auth_user` (`email`);
CREATE INDEX `es_system__auth_verification_identifier_idx` ON `es_system__auth_verification` (`identifier`);
