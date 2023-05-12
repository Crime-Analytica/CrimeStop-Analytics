
  <a href=""><p align="center">
<img height=100 src="https://github.com/GarretTomlin/CrimeStop-Analytics/blob/staging/docs/logo.png"/>
<p align="center">
  <strong>A solution to the ongoing problem of crime and public safety</strong>
</p>
  <p align="center">
  <a href="https://discord.gg/QCGtwgnj"><img alt="Join us on Discord" src="https://img.shields.io/discord/1087405055403106344?color=AA0000&logo=discord&logoColor=white"></a>
<img src="https://img.shields.io/github/license/garrettomlin/crimeStop-Analytics?color=AA0000&logoColor=5B5B5B">
<img src="https://img.shields.io/github/contributors/garrettomlin/CrimeStop-Analytics?color=AA0000">

</p>

---

# What is this folder?

This folder is the backend component of CRA ([/backend/](https://en.wikipedia.org/wiki/Frontend_and_backend#Backend_focused)), built with node js (express)

It's live on 👉 [CRA.TECH](https://www.crimestop-analytics.tech/)

# How can I contribute?

**We're using [DOCKER](https://www.docker.com/)**

Compile @CRA/Backend by executing the following commands:

```docker
cd ../backend
 docker build -t backend .
 docker-compose up -d
```

After you successfully compiled the backend, go back to this directory and add all the enviroment variables

You should now be all set to go, go ahead and run the dev image

```docker
cd ../backend

DATABASE_URL=
JWT_SECRET=
PORT=

docker run -p 49170:80 -d backend


```