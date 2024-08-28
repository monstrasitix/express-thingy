# Get started

- Run `yarn install`
- Create `.env` files from `.env.example` in each app;

# Running apps

- Backend: `yarn workspace backend start`
- Frontend: `yarn workspace frontend start`

# Resetting MongoDB data

```Bash
# Get Container ID
$ sudo docker container ls

# Access container's shell
$ sudo docker exec -it <container id> bash

# Run the reset
$ npx tsx ./src/database/reset.ts
```
