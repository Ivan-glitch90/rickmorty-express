# Rick and Morty Express App

A backend web app built with Node.js and Express that pulls data from the [Rick and Morty API](https://rickandmortyapi.com/) and renders it using server-side views. Built as a practice project to get hands-on with backend architecture — routes, models, and middleware — instead of just front-end JavaScript.

## About This Project

This project was a big step up for me from static HTML/CSS sites — it's my first project structured the "real" way backend apps are organized: separate folders for routes, models, middleware, and views, instead of one big file. It helped me understand how a request actually flows through a server-side app.

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- Rick and Morty API (public REST API, no key required)
- Server-side views (see `/views`)

## Project Structure

```
rickmorty-express/
├── middleware/   # custom middleware functions
├── models/       # data models
├── routes/       # route definitions
├── views/        # server-rendered templates
├── index.js      # app entry point
└── package.json
```

## Running It Locally

1. Clone the repo
   ```bash
   git clone https://github.com/Ivan-glitch90/rickmorty-express.git
   cd rickmorty-express
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file in the root if the project needs any environment variables (none required for the public Rick and Morty API, but this is where I'd add a port number or other config)
4. Start the server
   ```bash
   node index.js
   ```
5. Open your browser to `http://localhost:3000` (or whichever port is configured)

## What I Learned

- Structuring an Express app using the MVC (Model-View-Controller) pattern
- Writing custom middleware
- Fetching data from an external API on the server side, instead of the browser
- Keeping secrets and config out of the repo using `.env` + `.gitignore`

## What I'm Working On Next

- [ ] Add a proper description/topics to the GitHub repo
- [ ] Add pagination for browsing all characters
- [ ] Add search/filter functionality
- [ ] Deploy it somewhere live and link it here

## Contact

- [GitHub](https://github.com/Ivan-glitch90)
- [LinkedIn](https://www.linkedin.com/in/ivan-robles-943967b6/)
