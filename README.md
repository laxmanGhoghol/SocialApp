# Social Media App
## Build using MERN.

### Authentication API:
- User Registration: http://localhost:8800/api/auth/register
	- Required Fields: username, password, email
- User Login: http://localhost:8800/api/auth/login
	- Required Fields: email, password

### User API:
- Update user profile: http://localhost:8800/api/users/:id
	- Required Fields: userId.
- deleter user account: http://localhost:8800/api/users/:id
	- Required Fields: userId.
- get user profile: http://localhost:8800/api/users/:id
	- Required Fields: userId.
- follow user: http://localhost:8800/api/users/:id/follow
	- Required Fields: userId, id(id of user to follow)
- unfollow user: http://localhost:8800/api/users/:id/unfollow
	- Required Fields: userId, id(id of user to unfollow)
