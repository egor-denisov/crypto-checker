
# Crypto Checker

This project is under development.

## Content
- [Live Demo](https://github.com/egor-denisov/crypto-checker#live-demo)
- [Final product](https://github.com/egor-denisov/crypto-checker#final-product)
- [Running the project](https://github.com/egor-denisov/crypto-checker#running-the-project)
- [About the app](https://github.com/egor-denisov/crypto-checker#about-the-app)
- [Features](https://github.com/egor-denisov/crypto-checker#features)
- [Dependencies](https://github.com/egor-denisov/crypto-checker#dependencies)
- [Credits](https://github.com/egor-denisov/crypto-checker#credits)

## Live Demo
Live demo is not available at the moment
## Final product

- Main page:
![](https://sun9-west.userapi.com/sun9-61/s/v1/ig2/3CZ4KLihDXtVqT3QBsg118_U0BHzdnUdTTyHZ7skn07mS8FGWK4-_hsDq-9gr7U4yTlMP8oIqzojgHQWLqQTmZWz.jpg?size=1920x883&quality=95&type=album "Main page")
- Washlist page:
![](https://sun9-east.userapi.com/sun9-43/s/v1/ig2/6GfpkvEKmcZGlnDX-m0tezvJCLbGuNCfJKj5DqOAgk1PhSW4Tz6sQnAZRkLxEIYuIyqx9UvkPrc42EeArYPP-4us.jpg?size=1918x888&quality=95&type=album "Washlist page")
- Authorization window
![](https://sun9-west.userapi.com/sun9-9/s/v1/ig2/V4Yws6Z_MRjVskk7W7quug42Hcn3fVMuiaJd3pFb-Ac3_GM1kxXpf5WLP9tDsEiA2grOSvPqhWwhtZYSOiISdBtL.jpg?size=1919x886&quality=95&type=album "Authorization window")
- Coin page
![](https://sun9-north.userapi.com/sun9-77/s/v1/ig2/Isv59GsiTEqR0XLZal_Q2p46HkWoT6LC7fJLOuYqiGF4nBJhHCJdppSa1KOk-LSM_2oHsmO3cwRFUI4QZ2RAJgpb.jpg?size=1908x871&quality=95&type=album "Coin page")
- Wallet page
![](https://sun9-north.userapi.com/sun9-77/s/v1/ig2/dY02LOZEq9ge_Gr48EJzPlY1FyvFlYxI08V00IYy0b8kKVbEQFuX-D1mvnFxiSdqYgzO4rbBHhJ1RAW3gINhClyE.jpg?size=1914x887&quality=95&type=album "Selected coin")
![](https://sun9-north.userapi.com/sun9-83/s/v1/ig2/Sn9-NanF1Li1tlUiE7CaLDAt6Ffn-mV4N68Bxts3RF6UpxTUiristMPf7H51UFv_3qroz6LJiB6zOO1XqopSgS7v.jpg?size=1920x889&quality=95&type=album "Total")

## Running the project
To run the project go to the downloaded directory. Then run the commands:

```
# Run server-side on 1234 port
# Go to folder server
cd server
# Install missing packages
npm install
# Start index.js
npm start 
```
```
# Run PostgreSQL on 5432 port
# Open console with postgres and log in
./psql -U postgres
# Create database
create database crypto_checker_db;
# Go to this database
\connect crypto_checker_db;
# Futher then run the commands from the file 
# server/database.sql
```
```
# Run client-side on 3000 port
# Go to folder client
cd client
# Install missing packages
npm install
# Start index.js
npm start
```
Аfter executing these commands, you can go to http://localhost:3000/

## About the app

The application was created to track the exchange rate of cryptocurrencies. 

## Features

- It is possible to mark the selected coin
- It is possible to create a portfolio (wallet)
- You can track the charts of cryptocurrencies

## Dependencies
- React.js
- Typescript
- PostgreSQL
- Node.js
- SASS

## Credits

- Charts are implemented using [chart.js](https://www.chartjs.org/)
- Icons were taken from [iconer.app](https://iconer.app/iconic/)
- The data is taken from [coingecko.com](https://www.coingecko.com/)
