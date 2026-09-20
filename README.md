# Welcome to What's that

What's that is a tool to learn how to describe your code.
You can access the restored service here: https://whatsthat.german-fighter.workers.dev/

The historical Netlify URL is also kept in the deployment configuration:
https://whatsthat.netlify.app/

### Cloning

The frontend now uses a small Cloudflare Worker backed by D1. To override its URL locally,
create an `.env` file with `REACT_APP_API_ORIGIN=http://localhost:8787`.

The API lives in `cloudflare/` and can be deployed with:

```bash
npm run api:migrate:remote
npm run api:deploy
```

## Technologies

"What's that" has been developped with React, Material UI, nodeJS and Mongoose
