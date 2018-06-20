# iHyre Techincal Test


## Setup


* Install postgres with default settings (see config)
* npm install
* node app.js

#### Save messages 

Provide the endpoint below with a message(String) and it will save the message to the database and return it's ID. 

```
localhost:3000?message=<MESSAGE>
```

#### Get message with an ID
Given a ID 

```
localhost:3000?id=<ID>
```

## Example use

#### Save message 

```
POST localhost:3000?message=richard -> ID:33c69afb-0e58-4363-8d17-f38f1e22bec8
```
#### Get message using ID

```
GET localhost:3000?id=33c69afb-0e58-4363-8d17-f38f1e22bec8 -> richard
```

## Default settings for Database 

I used postgres with the following settings that are definded in the config:

  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: null,
  port: 5432,



