# On-line Banking App Demo

Banking is made very easy these days. People can send, receive and transfer money across the globe with the blink of an eye. This App is a little demo of an on-line banking application.

## Build With:

* React(UI)
* Redux toolkit(State Management)
* Axios(fetching data)
* json server(DB)

## Features

* Deposit
* Withdrawal
* Transfer
* Check account
* Transaction history
* Users

### Features in Details

**Users** have login details which they can use to login to their account.

**Deposit** users can make deposit(add money to their account) 

**Withdrawal** users can make withdrawals(take money) from their account.

**Transaction** users can send money to other account holder by providing their account details

**Check Account** users can make enquirers to their account and get their current balance in their account

**Transactions** users can have a history of their entire transaction including deposit, withdrawal and transfers



### DB JSON

```json
{
  "auth": [
    {
      "username": "lmanneh",
      "password": "1234",
      "id": 1
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "lamin manneh",
      "username": "lmanneh",
      "password": "1234"
    },
    {
      "id": 2,
      "name": "alieu saidy",
      "username": "asaidy",
      "password": "1234"
    }
  ],
  "accounts": [
    {
      "accountName": "lamin manneh",
      "accountNumber": "200-2334",
      "balance": 0,
      "interest": 0,
      "id": 1
    },
    {
      "accountName": "alieu saidy",
      "accountNumber": "200-2344",
      "balance": 0,
      "interest": 0,
      "id": 2
    }
  ],
    "transactions": []
  }
```

