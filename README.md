# Expense Tracker Server

This repository contains the source code for the Expense Tracker Server.

# Template for Environment Variables

```dosini
# Server config
NODE_ENV=development
PORT=

# Database config
DATABASE_NAME=
SESSION_SECRET=

## PG prefixed environment variables are used by node-postgres during initialization
PGHOST=
PGPORT=
```

Tip for generating a random session secret if Node.js is installed:

1. type `node` into a terminal instance to enter node's REPL (an interactive shell)
2. enter the command `require('crypto').randomBytes(64).toString('hex')` to generate a random 64 byte string, represented in hexadecimal format
