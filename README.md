# Chatter


### Chatter is a Twitter-like social media application built with TypeScript, TRPc, React, Next.js, and Tailwind CSS. It features a MySQL database with Prisma ORM, hosted on PlanetScale, and uses Clerk for authentication with GitHub OAuth. The site is deployed via Vercel. 

<details>
  <summary>Take a quick look</summary>

![Screenshot 2023-05-23 201639](https://github.com/AliciaMoses/playing-with-git/assets/115192380/2ea90125-a041-4f5b-8bee-b6f31660da73)

</details>

<br>

# Table of Contents

1. [Features](#features)
2. [Demo](#demo)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
4. [Usage](#usage)
5. [Testing](#testing)
   - [Component and E2E Testing](#component-and-e2e-testing)
   - [Unit Testing](#unit-testing)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)
9. [Acknowledgements](#acknowledgements)

# Features

- Modern and responsive UI
- Sign In / Sign Up with GitHub OAuth
- Create, read, and delete posts
- Post replies
- User profiles
- Real-time feed updates
- Rate limiting using Upstash Redis

# Demo

Try out the live demo of Chatter here: https://chattersphere.vercel.app/

# Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes.

## Prerequisites

- Node.js (v14 or newer)
- npm or Yarn (npm comes with Node.js installation, Yarn can be installed separately)
- MySQL (v8.x)
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AliciaMoses/chatter.git
cd chatter
```

2. Install dependencies:

Using npm:
```
npm install
```

Using Yarn:
```
yarn install
```

## Configuration

3. Create a `.env` file in the root directory of the project

4. Add the following environment variable values:

```
NODE_ENV=development

DATABASE_URL=your_database_url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

CLERK_SECRET_KEY=your_clerk_secret_key

UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url

UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token

```

Note: This configuration uses the `.env` file instead of `.env.local.` Make sure not to commit sensitive information to your repository. Add the `.env` file to your `.gitignore` file to prevent it from being accidentally committed.

## Usage

5. Start the development server:

Using npm:
```
npm run dev
```

Using Yarn:
```
yarn dev
```

6. Open your browser and visit http://localhost:3000.

# Testing

## Component and E2E Testing

Cypress is used for component and E2E testing. To run tests, use the following commands:

Using npm:
```
npm run cypress:open
```

Using Yarn:
```
yarn cypress:open
```

## Unit Testing

Jest is used for unit testing. To run tests, use the following commands:

Using npm:
```
npm test
```

Using Yarn:
```
yarn test
```

# Deployment

Follow the official Next.js documentation to deploy your application on Vercel.
https://nextjs.org/docs/pages/building-your-application/deploying

# Contributing

To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name: a suitable prefix, with each word separated by a hyphen e.g. `feature-new-feature` or `fix-bug-fix`.
3. Commit your changes to the new branch.
4. Open a pull request, describing the changes you've made and the problem they solve.
# License

This project is licensed under the MIT License. 

# Acknowledgements

- Next.js
- React
- TRPc
- Tailwind CSS, Tailwind UI
- Prisma
- PlanetScale
- Clerk
- Upstash Redis
- Vercel
- Cypress
- Jest
- T3 stack : https://create.t3.gg/