#!/usr/bin/env bash

DB_FILE=db.json

if [ -f $DB_FILE ]; then
  echo "Overwriting existing $DB_FILE"
  echo '{ "users": [] }' >| $DB_FILE
else
  echo '{ "users": [] }' > $DB_FILE
fi

./node_modules/.bin/json-server $DB_FILE -m ./node_modules/json-server-auth &

SERVER_PID=$!

sleep 2

for n in {1..50}; do
  .bin/createUser.js
  sleep 0.25
done

kill "$SERVER_PID"

echo "OK: database seeded"

exit 0
