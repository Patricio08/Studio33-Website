# Studio33-Website

## Introdution

The purpose of this project is the development of a website for showcasing the services provided by a small (but professional) record studio.
This project consists of a single page application implemented using Javascript, HTML, CSS and the webpack module bundler.

## Architecture

The website is hosted in Firebase. Besides hosting, Firebase Functions is also used to enable sending emails through the web application. As to not require user authentication, the emails are actually sent from a dummy email created only for this purpose. For this dummy email it was necessary to obtain an access token in OAuth 2.0 Playground.

## Website

The website is hosted in: https://sky-studio33.web.app/