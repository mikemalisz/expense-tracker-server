# Expense Tracker Server

This repository contains the source code for the server component of the Expense Tracker iOS app. The server code is written in TypeScript, and I also created a database configuration script in plain JavaScript for setting up new machines.

The server is responsible for two large components of the application:

1. [User Authentication](#user-authentication)
2. [Expense Item Persistence](#expense-item-persistence)

<h2 id="user-authentication">User Authentication</h2>

To be able to gain access to the expense item API, the user must be authenticated. Expense items belong to individual accounts, meaning they should only be accessible by the person that created them. To do this, the server attaches a `user_id` property to each expense item when saving it to the database, making a one-to-many relationship between a user account and their expense items.

#### Authentication Process

Currently, the only way to gain authenticated status on the server is to provide a JSON Web Token (JWT) generated from Apple's Authentication Services framework. This JWT is a result of the Sign in with Apple process on the client iOS application. <a href="https://github.com/mikemalisz/expense-tracker-ios/blob/main/Documentation/architecture.md#authentication">More info on that process here</a>

<img src="documentation/resources/server-client-jwt.png">

Once the server receives a JWT identity token, it will use the `TokenService` class to verify its validity. `TokenService` uses the <a href="https://github.com/panva/jose">jose</a> NPM package which helps with decoding and verifying JWT. To verify the newly acquired token was created by Apple, we must test it against a key that we get from Apple. My knowledge of cryptography is pretty limited, but the steps we take look like this:

1. Acquire JSON Web Key Sets (JWKS) from Apple. JWKS is a set of keys that can be used to verify the identity token from the client. <a href="https://auth0.com/docs/tokens/json-web-tokens/json-web-key-sets">More info on JWKS can be found here.</a>
2. Verify the identity token using the JWKS

The code we write to either receive either a verified identity token or error looks like this:

```TypeScript
const JWKS = createRemoteJWKSet(new URL("https://appleid.apple.com/auth/keys"))
const verifiedToken = await jwtVerify(identityToken, JWKS)
```

The `jose` package does a great job at abstracting away the complexity of verifying JWT. We can now use `verifiedToken` to make sure the token is not expired yet, as well as extract information like the user's ID and email address.

Now that we've verified the token, we can continue with the rest of the authentication process. This is either our user's first time authenticating, which means we have to insert their information into the database, or they're already an existing user and just need their authentication status to be upgraded.

```TypeScript
// get verified token
const result = await service.verifyIdentityToken(identityToken, clientId)

// query to see if user exists in our database
const userExistsQuery = await databaseQuery('SELECT user_id FROM accounts WHERE apple_user_id=$1', [result.sub])

if (userExistsQuery.rowCount > 0) {
   // user already exists, just authenticate them
   req.session.userId = userExistsQuery.rows[0].user_id
} else {
   // user doesn't exist yet, insert their information into the table
   // and then authenticate them
   const insertQueryResults = await databaseQuery('INSERT INTO accounts(apple_user_id, email) VALUES($1, $2) RETURNING user_id', [result.sub, result.email])
   req.session.userId = insertQueryResults.rows[0].user_id
}
```

I use the user ID contained in the verified token to issue a database query for any accounts that match that user ID. If the query contains results, that means this user already exists in the database and we should just authenticate them. Otherwise, we have to insert their details before authenticating them.

I use server side sessions as the primary authentication mechanism. This means the server is responsible for managing all the session data, which gets stored to the databse. The server sets a unique id to the cookie header of each request. This unique id can be used to identify existing sessions in the database.

Being able to store session data on the server makes it easy to keep authentication state attached to each user. When the user logs in, we just add information that indicates the user is logged in to the session data, and when the user logs out we can remove that data from their session. In my case, I decided to add and remove a `userId` property from the session object.

In conclusion, using Sign in with Apple is a relatively simple and secure way to authenticate users, compared to rolling your own email and password authentication flow. Once we've verified the token we've received is from Apple, we can utilize server side session data to easily keep track of user authentication state.

<h2 id="expense-item-persistence">Expense Item Persistence</h2>

## Template for Environment Variables

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
