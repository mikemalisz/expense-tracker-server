const { Client } = require('pg')
const dotenv = require('dotenv')
dotenv.config()

class DatabaseConfigurator {
	static async configureAll() {
		console.log('configuring database...')
		await this.createDatabase()
		await this.configureExtensions()
		await this.createAccountsTable()
		await this.createExpenseItemsTable()
		await this.createSessionTable()
		process.exit(0)
	}

	static async createDatabase() {
		const createDatabaseClient = new Client()
		await createDatabaseClient.connect()

		try {
			await createDatabaseClient.query(
				`CREATE DATABASE ${process.env.DBNAME}`
			)
			console.log('create database')
		} catch (error) {
			console.error(error)
		}
		await createDatabaseClient.end()
	}

	static async configureExtensions() {
		const extensionsClient = new Client({ database: process.env.DBNAME })
		await extensionsClient.connect()

		try {
			await extensionsClient.query(
				'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'
			)
			console.log('create extension')
		} catch (error) {
			console.error(error)
		}
		await extensionsClient.end()
	}

	static async createAccountsTable() {
		const accountsClient = new Client({ database: process.env.DBNAME })
		await accountsClient.connect()

		try {
			await accountsClient.query(`
            CREATE TABLE IF NOT EXISTS accounts (
               user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
               apple_user_id text NOT NULL UNIQUE,
               email text,
               date_created TIMESTAMP NOT NULL DEFAULT NOW()
            );
         `)
			console.log('create accounts table')
		} catch (error) {
			console.error(error)
		}
		await accountsClient.end()
	}

	static async createExpenseItemsTable() {
		const expenseItemsClient = new Client({ database: process.env.DBNAME })
		await expenseItemsClient.connect()

		try {
			await expenseItemsClient.query(`
            CREATE TABLE IF NOT EXISTS expense_items (
               item_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
               user_id uuid NOT NULL,
               amount_in_cents integer NOT NULL,
               expense_title text NOT NULL,
               expense_description text NOT NULL,
               date_of_purchase bigint NOT NULL,
               date_created bigint NOT NULL
            );
         `)
			console.log('create expense_items table')
		} catch (error) {
			console.error(error)
		}
		await expenseItemsClient.end()
	}

	/* This query was obtained from connect-pg-simple NPM package */
	static async createSessionTable() {
		const sessionClient = new Client({ database: process.env.DBNAME })
		await sessionClient.connect()

		try {
			await sessionClient.query(`
            CREATE TABLE IF NOT EXISTS "session" (
               "sid" varchar NOT NULL COLLATE "default",
               "sess" json NOT NULL,
               "expire" timestamp(6) NOT NULL
            )
            WITH (OIDS=FALSE);
            
            ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
            
            CREATE INDEX "IDX_session_expire" ON "session" ("expire")          
         `)
			console.log('create session table')
		} catch (error) {
			console.error(error)
		}
	}
}

exports.DatabaseConfigurator = DatabaseConfigurator
