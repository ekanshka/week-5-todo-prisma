# Project to build a TODO API using a postgres DB   

<!-- ## Deployed Live on 🚀:
### Frontend : Vercel -> https://week-4-paytm-mern.vercel.app/signin
### Backend : Render -> https://week-4-paytm-mern.onrender.com/api/v1/user -->

## Tech Stack : 💻
### Backend -> TypeScript, Express, JWT 
### Database -> Postgres, Prisma ORM
<!-- #### Frontend -> TypeScript, React, Tailwind -->


<!-- ## Tests Done (POSTMAN and FRONTEND) : ✅ 👍

- successfull backend integration
- most errors handled (frontend/backend)

- auth: 
    - creates new users on signup with a random balance bw 1-10000
    - keeps them logged in until they want to logout on all pages
    - throws error if they are not logged in
    - logout feature deletes access token and signs them out

- navigation: 
    - all pages navigate between them successfully
    - all pages work as expected
    - payment feature works as expected
    - user data updates successfully
    - user data and account connected gets deleted on account deletion
    - money transfer feature deducts correct user's balance and adds to correct user's account -->


## Details : 🎊

<!-- - Backend : -->
- typescript express server
- users table and accounts table in POSTGRESQL using PRISMA ORM
- zod validation for all necessary routes

- auth routes : 
    - POST "api/v1/user/signup", creating user with empty todos array and login with jwt auth
    - POST "api/v1/user/signin", logs in the user with jwt auth

- user routes : 
    - GET "api/v1/todos/", fetching current user's todos
    - GET "api/v1/todos/:todoId", fetching a specific todo of the user
    - POST "api/v1/todos/createTodo", create a new todo
    - POST "api/v1/todos/updateTodo/:todoId", update any specific todo of the user
    - POST "api/v1/todos/deleteTodo/:todoId", delete any specific todo of the user

- test route : 
    - GET "api/v1/todos/bulk", fetching all todos of all users without requiring authentication (test route)


<!-- - Frontend :
    - typescript vite react - tailwind stack
    - auth pages : 
        - "/signup", stores jwt token and redirects to dashboard 
        - "/signin", stores jwt token and redirects to dashboard
    - user pages : 
        - "/dashboard" , shows available users except the current logged in user
        - "/user" , allows users to see their username(email), userid, and editable firstname, lastname fields to update their information. Also allows a delete account option
        - "/send", to transfer money to a another user -->

<!-- ## Some screenshots: 📷

1. Signup page

![Signup Page](public/signup-page.png)


2. Signin page

![Signin Page](public/signin-page.png)


3. Dashboard page

![Dashboard Page](public/dashboard-page.png)

4. User Page

![User Page](public/user-page.png)

5. Send Page

![Send Page](public/send-page.png) -->


<!-- ## Bugs : ❌
- UX related: 
    - search feature works but is case sensitive [fix would require a little structural change with mongo schema and stuff]
    - landing on any random page does not redirect to a working url ex the root url -->


<!-- ## Run : 🚀 -->
<!-- - Create .env in root folder and set the environment variables JWT_SECRET and MONGO_URL
- Run <code> node index.js </code> in root folder -->

