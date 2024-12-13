cd backend

npm run build-Frontend

docker compose up -d --build

cd songs

tsc extract-songs.ts

node extract-songs.js
--current gets stuck after last song "Zion"
