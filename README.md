# Expense Tracker Server

This repository contains the source code for the Expense Tracker Server.

# Template for Environment Variables

```dosini
# Server config
PORT=

# Database config
DATABASE_NAME=
DATABASE_HOST=
DATABASE_PORT=
SESSION_SECRET=
```

Tip for generating a random session secret if Node.js is installed:

1. type `node` into a terminal instance to enter node's REPL (an interactive shell)
2. enter the command `require('crypto').randomBytes(64).toString('hex')` to generate a random 64 byte string, represented in hexadecimal format
