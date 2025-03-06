
![Logo](https://raw.githubusercontent.com/HonzaJeMocDobrej/uPeak/35f10de1c85f90bd0a145d72bfc4744d5237bdb8/client/src/assets/icons/uPeakWhole.svg)

## What is uPeak?

- uPeak is an app that helps you with productivity
- You can manage your todos, notes and your time using pomodoro timer

## Requirements
- NodeJS
- XAMPP
- A lot of patience during the installation process xd

## Installation Guide
### Server
#### First of all open XAMPP
#### Click these buttons
![App Screenshot](https://i.ibb.co/D1HbwRs/Xampp-snippet.png)
#### In the phpmyadmin left menu click new and create database with the name `uPeak` and type `utf8_bin`
![App Screenshot](https://i.ibb.co/9c4Cb57/Xampp-snippet2.png)

#### In cmd clone the repo
```bash
  git clone https://github.com/HonzaJeMocDobrej/uPeak.git
```
#### Go to the repository and open it with vsc 
```bash
  cd uPeak
  code .
```
#### Go to the folder structure menu on the left and copy paste the `.env.template` to the root of the server dir
#### Rename it from `.env.template` to `.env`
#### Make sure you have the same values written as below
![App Screenshot](https://i.ibb.co/cQKSRdr/xampp-screenshot.png)
#### On the top menu go to `Terminal > New Terminal`
#### In the terminal go to the server folder, install the modules and run the server
```bash
  cd server
  npm i
  npm run dev
```
#### In the folder structure click server and open index.ts
#### Uncomment this line of code and wait a few seconds untill the changes apply to the database
![App Screenshot](https://i.ibb.co/PQTx8D5/vsc-snippet.png)
#### After the changes applied comment the code back to its default state
### Client
#### Click the plus button located in the terminal
![App Screenshot](https://i.ibb.co/QjXVtVY/u-Peak-snippet.jpg)
#### In the terminal go to the client folder, install the modules and run the client
```bash
  cd client
  npm i
  npm run dev
```
- If npm i doesn`t work, try npm i --force
#### In the terminal type `--host` or open the link below
- http://localhost:5173

