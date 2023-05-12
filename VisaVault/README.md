
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

This folder is called VisaVault ([/ˈvɪzəvɔlt/](https://www.merriam-webster.com/dictionary/visage)), it is currently used for our Python Facial Recognition backend written in flask.

It's live on 👉 [CRA.TECH](https://www.crimestop-analytics.tech/)

# How can I contribute?

**By  using [PIP](https://pypi.org/project/pip/)*

Compile @CRA/VisaVault by executing the following commands:

```bash
cd ../VisaVault
 docker build -t visavault .

```


After you successfully compiled VisaVault,

You should now be all set to go, go ahead and run the dev image

```bash
cd ../visaVault

docker run -p 49160:5000 -d visavault
```