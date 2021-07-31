# Social Media App
## Build using MERN.

####Steps:
1. **open termincal**
2. change current directory to backend
3. npm start
4. **(open new terminal) **
5. change current directory to backend
6. npm run authStart
7. **(open new terminal) **
8. change current directory to frontend/socialmedia
9. npm start
10. **(open new terminal )**
11. change current directory to socketServer
12. npm start

Bingo :blush:

(**Note:**  Make sure **backend/.env** file cotains **MONGO_URL, ACCESS_TOKEN_SECRET,  and REFRESH_TOKEN_SECRET**)


------------



### Authentication API:
- User Registration:(POST) http://localhost:8100/api/auth/register
	- Required Fields: username, password, email
- User Login:(POST) http://localhost:8100/api/auth/login
	- Required Fields: email, password
- User Logout:(DELETE) http://localhost:8100/api/auth/logout
	- Required Fields: token (refreshtoken)
- Refresh AccessToken :(POST) http://localhost:8100/api/auth/token
	- Required Fields: token (refreshToken)

### User API: (JWT based authorization, requires valid token to access this apis)
- Update user profile: (PUT) http://localhost:8800/api/users/:id
- deleter user account: (DELETE) http://localhost:8800/api/users/:id
- get user profile:(GET) http://localhost:8800/api/users/:id
- follow user: (PUT) http://localhost:8800/api/users/:id/follow
	- Required Fields: id(id of user to follow)
- unfollow user:(PUT) http://localhost:8800/api/users/:id/unfollow
	- Required Fields: id(id of user to unfollow)

### Posts API: (JWT based authorization, requires valid token to access this apis)
- Create Post: (POST) http://localhost:8800/api/posts
	- Required Fields: desc
- Update Post: (PUT) http://localhost:8800/api/posts/:id
	- Required Fields: id(id of post)
- Delete Post: (DELETE) http://localhost:8800/api/posts/:id
	- Required Fields: id(id of post)
- Like/Unlike Post: (PUT) http://localhost:8800/api/posts/:id/like
	- Required Fields: id(id of post)
- Get Post: (GET) http://localhost:8800/api/posts/:id
	- Required Fields: id(id of post)
- Get List of Posts: (GET) http://localhost:8800/api/posts/timeline/data

### Conversation API: (JWT based authorization, requires valid token to access this apis)
- Create Conversation: (POST) http://localhost:8800/api/conversation/create
	- Required Fields: receiverID
- Get conversations messages list : (GET) http://localhost:8800/api/conversation/:id
- Get user's conversations list: (GET) http://localhost:8800/api/conversation/get
- Delete conversation: (DELETE) http://localhost:8800/api/conversation/delete/:id

### Message API: (JWT based authorization, requires valid token to access this apis)
- Create Message: (POST) http://localhost:8800/api/message/
	- Required Fields: conversationId, text