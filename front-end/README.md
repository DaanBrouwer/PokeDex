# Installation

Follow these steps to install this project:

## Step 1. Install and run the back-end first

First make sure the back-end is installed and up and running.

Go to: the backend folder and follow the README.

## Step 2 Download this repository from GitHub.

Either clone this repository using git or download this repository
using the download button on GitHub.

## Step 3 Install nvm on your machine.

Installing NodeJS yourself for every version is tedious. I recommend
using `nvm` which stands for "Node.js version manager". With nvm
you can install and use different Node.js versions on one machine.

This is useful when switching between projects which require different
Node.js versions.

For MacOs and linux use: https://github.com/nvm-sh/nvma. Install
`nvm` using `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

For windows use: https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows
click on "Download now" and run the installer.

## Step 4 Install Node.js on your machine.

After `nvm` is installed on your machine run the following command
in your terminal:

`nvm install 18.12.1`

## Step 5 Install packages

Navigate to the location where you have put this git repository
in the terminal.

Now we are going to install all packages needed to start the
application. Run the following command:

`npm install`

## Step 6 Starting the application

Now that everything is installed run the following command:

`npm start`

This should open up a browser in on the following url:

`http://localhost:3000/playground`

## Step 7 Checking the back-end connection

You should see a message on the page:

"Welcome to the playground"

Below that it should say:

"Connection with back-end established you are good to go"

If you see both these messages you are good to go.

## Step 8 Installing Visual Studio Code

I recommend using Visual Studio Code as your code editor for the duration
of this course.

Note: you can also use another editor just make sure it supports TypeScript.

1. Go to https://code.visualstudio.com/
2. Click on the "Download" button.
3. Install Visual Studio Code after it has been downloaded.

I recommend installing some useful extensions, here is an instruction
on how to install extensions:

https://code.visualstudio.com/docs/editor/extension-marketplace

Now install the following extensions:

1. ESLint by Dirk Baeumer
2. Prettier by Prettier
3. Version Lens by pflannery

## Step 9 Installing browser development plugins

When developing React applications it is handy to install some
browser plugins so you can debug react applications better.

For Chrome:

1. React Developer Tools: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en

2. Redux DevTools: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en

For Firefox:

1. https://addons.mozilla.org/en-US/firefox/addon/react-devtools/

2. https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/
