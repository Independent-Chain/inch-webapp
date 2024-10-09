<center><img src="md_logo.png" height="100px"></center>

# Instructions for launching the inch app.

This instruction is written solely for educational purposes. After reading this guide, you will be able to launch the inch app locally on your computer by creating your own database for the application and uploading your own inch app to telegram in mini app format.

## 1. Installing the necessary software.

To run the application, you will need to install the following software:

1. `Node.js` - free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps,
   command line tools and scripts. ( [Download](https://nodejs.org/en) )
2. `PostgreSQL` - PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development
   that has earned it a strong reputation for reliability, feature robustness, and performance. ( [Download](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) )
3. `Tuna` - This is a console utility that helps you get direct access from the Internet to sites or applications running locally on your PC. You run a short command in the console, receive a link in response, and your friend from anywhere in the world will go to a website running on your PC on the local network, and all this without VPN, requirements for a "white" IP, and without port forwarding. ( [Download](https://tuna.am/) )
4. `Git` - Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. ( [Download](https://git-scm.com/) )

### 1.1 Configure Node.js.

To check the health of the Node.js and the npm package manager must run the `node -v`  command in the terminal. After that, you should receive a message about the current version Node.js like this: `v20.14.0`.

### 1.2 Configure PostgreSQL.

PostgreSQL is installed using a regular executable.the exe file. During installation, you need to specify the password for the postgres user. Remember this password.

After installation, open the terminal and run next commands:

```
psql -U username
CREATE DATABASE inch_test_database
```

The database is now ready for use.

### 1.3 Configure Tuna.

To bind a token to tuna on your computer, run the command: `tuna config save-token <TOKEN>`. After that, the tuna will be ready for use.

### 1.4 Configure Git.

Git is installed using a regular executable.the exe file. After installation, open the terminal and run the `git -v` command. After execution, you should get a similar result: `git version 2.45.1.windows.1`.

## 2. Configure code of the application for launch.

1. Open the terminal and navigate to the directory where the project will be located.

   ```
   cd path/to/directory
   ```
2. Run the cloning of `inch-webapp` repository.

   ```
   git clone https://github.com/Independent-Chain/inch-webapp
   ```
3. Go to the repository directory.

   ```
   cd inch-webapp
   ```

   Now you can see two directories: `Client` and `Server`.
4. Go to `Client/` directory and run installing of necessary packages.

   ```
   cd Client
   npm install
   ```
5. Create and save `.env` file for client with the following contents.

   ```
   VITE_LAUNCH_MODE=DEVELOP
   VITE_DEVELOP_DOMAIN=http://localhost:3000/api
   ```
6. Go to `Server/` directory and run installing of necessary packages.

   ```
   cd ../Server
   npm install
   ```
7. Create and save `.env` file for server with the following contents. Change the password to your own in `DEVELOP_DATABASE_URL`.

   ```
   BOT_TOKEN=<YOUR_TELEGRAM_BOT_TOKEN>
   LAUNCH_MODE=DEVELOP
   DEVELOP_DATABASE_URL=postgresql://postgres:password@localhost:5432/inch_test_database?schema=app
   SECRET_KEY=7GiUvXfFYmk8si3ouq64ZZsofMAcHHJp
   ```
8. Run the global installing of `Prisma ORM`.

   ```
   npm install -g prisma
   ```
9. Generate prisma model for working with Prisma ORM.

   ```
   prisma generate
   ```
10. Create the necessary tables in the previously created database.

    ```
    prisma db push
    ```
11. In a separate terminal, move to the `Client/` directory and launch the client part of the application.

    ```
    npm run dev
    ```
12. In a separate terminal, move to the `Server/` directory and run the server part of the application.

    ```
    npm run start:dev
    ```
13. In a separate terminal, open a tunnel for external access to the application you are running.

    ```
    tuna http localhost:5173
    ```
14. After opening the tunnel, you will receive the following output. The link following the word `Forwarding` is the **link to your application**.

    ```
    INFO[22:46:33] Welcome to Tuna
    INFO[22:46:34] > New version available: 0.18.0 -> 0.19.0  
    INFO[22:46:34] > Update instructions: https://tuna.am/docs/guides/update?os=windows 
    INFO[22:46:34] Account: diomin.vd13@gmail.com (Paid till 24.10.2024) 
    INFO[22:46:34] Web Interface: http://127.0.0.1:4040
    INFO[22:46:35] Forwarding https://ne2i3i-94-25-183-10.ru.tuna.am -> localhost:5173 
    ```

## 3. Configure Telegram Mini App.

Next, you need to configure the mini-application through "BotFather" and specify the link you received earlier as an internal link for the application. After that, the application will be ready to launch.
