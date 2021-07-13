# Social Media App
## Build using MERN.

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


I have used JWT based authorization so to access posts and user data. Here two servers are used one for authenticationa and another for posts,user requests.