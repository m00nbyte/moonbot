# Moonbot

### Automate your cryptocurrency loans

## :dizzy_face: Features:

:rocket: `minimal` and `clean` design<br />
:art: responsive layout (tablet & mobile friendly)<br />
:last_quarter_moon: dark/light mode (auto detect the system color-mode)<br />
:speech_balloon: multi-language (auto detect the system language)<br />
:busstop: tour (short introduction into the website)<br />

## :gear: Installation Steps:

```ini
# /backend/config/index.js
db: {
    host: 'localhost',
    port: 27017,
    name: 'lending',
    user: 'user',
    pass: 'pass'
},
JWT_SECRET: '<secret_string>',
PORT_DEV: 3001,
PORT_PROD: 3000
```

```ini
# /frontend/.env
REACT_APP_API_URL=http://localhost:3001
```

```bash
# go to
$ cd backend

# install dependencies
$ yarn

# serve
$ yarn server:dev
$ yarn server

# cron
$ yarn submit-offers:dev
$ yarn submit-offers
$ yarn sync-earnings:dev
$ yarn sync-earnings
```

```bash
# go to
$ cd frontend

# install dependencies
$ yarn

# dev
$ yarn start

# prod
$ yarn build
```

```bash
# add/start instance
$ sudo pm2 start yarn --name "moonbot" --exp-backoff-restart-delay=100 -- server

# stop instance
$ sudo pm2 stop moonbot

# instance information
$ sudo pm2 show moonbot

# realtime information
$ sudo sudo pm2 monit

# add to startup
$ sudo pm2 startup

# update config (run if instances were modified)
$ sudo pm2 save
```

## [:straight_ruler: Code of Conduct](code-of-conduct.md)

## [:card_index: Contributing Guidelines](contributing.md)

## [:lock: Report Vulnerabilities](security.md)

## [:page_with_curl: MIT License](license.md)

## :heart: Like my work?

This project needs a :star: from you.
Don't forget to leave a star.

<a href="https://www.buymeacoffee.com/m00nbyte" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="217" height="60">
</a>
