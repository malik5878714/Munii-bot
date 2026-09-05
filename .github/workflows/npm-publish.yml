name: Run Bot - Munii-bot

on:
  push:
    branches:
      - main

jobs:
  run-bot:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout

      - name: Setup Node.js
        uses: actions/setup-node
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Run the bot
        run: node index.js
