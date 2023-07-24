# Installation

Follow these steps to install this project:

## Step 1 Download this repository from GitHub.

Either clone this repository using git or download this repository
using the download button on GitHub.

## Step 2 Install nvm on your machine.

Installing NodeJS yourself for every version is tedious. I recommend
using `nvm` which stands for "Node.js version manager". With nvm
you can install and use different Node.js versions on one machine.

This is useful when switching between projects which require different
Node.js versions.

For MacOs and linux use: https://github.com/nvm-sh/nvma. Install
`nvm` using `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

For windows use: https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows
click on "Download now" and run the installer.

## Step 3 Install Node.js on your machine.

After `nvm` is installed on your machine run the following command
in your terminal:

`nvm install 18.12.1` 

## Step 4 Install packages

Navigate to the location where you have put this git repository
in the terminal.

Now we are going to install all packages needed to start the
application. Run the following command:

`npm install`

## Step 5 Starting the application

Now that everything is installed run the following command:

`npm start`

This should start the REST and GraphQL api's check that you see
the following messages:

1. REST API is now running on http://localhost:4000/api
2. GraphQL is now running on http://localhost:4000/api/graphql