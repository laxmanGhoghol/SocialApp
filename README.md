# Social Media App
## Build using MERN.

### Authentication API:
- User Registration:(POST) http://localhost:8800/api/auth/register
	- Required Fields: username, password, email
- User Login:(POST) http://localhost:8800/api/auth/login
	- Required Fields: email, password

### User API:
- Update user profile: (PUT) http://localhost:8800/api/users/:id
	- Required Fields: userId.
- deleter user account: (DELETE) http://localhost:8800/api/users/:id
	- Required Fields: userId.
- get user profile:(GET) http://localhost:8800/api/users/:id
	- Required Fields: userId.
- follow user: (PUT) http://localhost:8800/api/users/:id/follow
	- Required Fields: userId, id(id of user to follow)
- unfollow user:(PUT) http://localhost:8800/api/users/:id/unfollow
	- Required Fields: userId, id(id of user to unfollow)

### Posts API:
- Create Post: (POST) http://localhost:8800/api/posts
	- Required Fields: userId, desc
- Update Post: (PUT) http://localhost:8800/api/posts/:id
	- Required Fields: UserId, id(id of post)
- Delete Post: (DELETE) http://localhost:8800/api/posts/:id
	- Required Fields: UserId, id(id of post)
- Like/Unlike Post: (PUT) http://localhost:8800/api/posts/:id/like
	- Required Fields: UserId, id(id of post)
- Get Post: (GET) http://localhost:8800/api/posts/:id
	- Required Fields: id(id of post)
- Get List of Posts: (GET) http://localhost:8800/api/posts/timeline/data
	- Required Fields: UserId