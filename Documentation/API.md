## API Routes
### Auth
* Essentially, JWT's are used for authentication. A JWT is sent with every request to validate the user.

##### POST /api/auth/register
> Registers a new user. Should generate email confirmation code, and send email to user's email containing code attached to link.
###### Request
* Categories is only sent if type is 1 (NGO)

```json
{
    "type": "0 for user, 1 for ngo",
    "name": "John Smith",
    "email": "johnsmith@gmail.com",
    "password": "password",
    "location": "West Lafayette, IN",
    "categories": [0, 2, 4]
}
```
###### Response
* Sends back 200 if successfull, 400 if fields messed up and sends back error string

```json
{
    "error": null
}
```

##### POST /api/auth/login
> Logs in a user. Returns access token.
###### Request
```json
{
    "email": "email",
    "password": "password",
}
```
###### Response
* Sends back 200 and token if successfull, 400 if fields messed up and sends back error string.

```json
{
    "token": "Bearer 421023j1k0j0saj0fd9sadjfds",
    "error": null
}
```

##### POST /api/auth/emailConf
> Confirms an email, allows user to login.
###### Request
```json
{
    "confirmation": "UUID"
}
```
###### Response
* Sends back 200, 400 if fields messed up and sends back error string.

```json
{
    "error": null
}
```

##### POST /api/auth/pass/forgot
> Resets a user's password. Emails the user a URL with a code that user visits
###### Request
```json
{
    "email": "email"
}
```
###### Response
* Sends back 200, 400 if not and send back error string.

```json
{
    "error": null
}
```

##### POST /api/auth/pass/reset
> Sends back a new password
###### Request
```json
{
    "password": "password",
    "token": "UUID"
}
```
###### Response
* Sends back 200, 400 if not and send back error string.

```json
{
    "error": null
}
```

##### GET /api/auth/token
> Fetches a new token, with an existing token
###### Request
* Just contains header token

###### Response
* Sends back 200 and token if successfull, 400 if unsuccessful, with error string.

```json
{
    "token": "Bearer 421023j1k0j0saj0fd9sadjfds",
    "error": null
}
```

### Account
* All of these routes expect HTTP header Authentication containg the JWT for auth.

##### GET /api/account
> Fetches current user's account
###### Request
* Just contains header token

###### Response
* Sends back 200 if successfull, 400 if unsuccessful, with error string. Only sends categories if account NGO.

```json
{
    "type": "0 for user, 1 for ngo",
    "name": "John Smith",
    "email": "johnsmith@gmail.com",
    "location": "West Lafayette, IN",
    "categories": [0, 2, 4],
    "error": null
}
```

##### GET /api/account/:accountId
> Fetches an account from id
###### Request
* Just contains header token, and account id in url

###### Response
* Sends back 200 if successfull, 400 if unsuccessful, with error string. Only sends categories if account NGO.

```json
{
    "type": "0 for user, 1 for ngo",
    "name": "John Smith",
    "email": "johnsmith@gmail.com",
    "location": "West Lafayette, IN",
    "categories": [0, 2, 4],
    "error": null
}
```

##### POST /api/account
> Updates the current user's profile
###### Request
* Contains header token as well. Only updates fields provided.

```json
{
    "name": "New Name",
    "location": "New York, NY",
    "categories": [4],
}
```

###### Response
* Sends back 200 if successfull, 400 if unsuccessful, with error string.

```json
{
    "error": null
}
```

##### POST /api/account/password
> Updates the current user's password
###### Request
* Contains header token as well.

```json
{
    "password": "newpassword"
}
```

###### Response
* Sends back 200 if successfull, 400 if unsuccessful, with error string.

```json
{
    "error": null
}
```
