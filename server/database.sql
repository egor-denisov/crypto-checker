create TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    washlist_id INTEGER,
    wallet_id INTEGER
);

create TABLE washlists(
    id SERIAL PRIMARY KEY,
    washlist JSON
);

create TABLE wallets(
    id SERIAL PRIMARY KEY,
    wallet JSON
);