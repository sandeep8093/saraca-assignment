Hosted Links: 
  Deployed application Link: https://roaring-fox-f65eaa.netlify.app/
  Deployed Backend Server Link: https://saraca-server.onrender.com/
  Server Code Github Link: https://github.com/sandeep8093/saraca-assignment
  Client Side Code Github Link: https://github.com/sandeep8093/saraca-assignment-client

Features:
  User Registration (signup):
    Handles user registration by receiving data such as name, password, email, phone, image URL, address, gender, and profile summary.
    Uses bcrypt to hash the password before saving it to the database.
    Checks if a user with the same email already exists and returns an error message if found.
    Responds with a success message when the user is successfully registered.
  
  User Login (login):
    Authenticates users during login by comparing the entered password with the hashed password stored in the database.
    Generates a JSON Web Token (JWT) upon successful login, containing user information like id and email.
    Provides a token and user information in the response.
  
  Get Users (getUsers):
    Retrieves a list of all users from the database.
    Responds with the list of users in JSON format.
    
  Get User Profile (getUserProfile):
    Retrieves user profile information based on the provided user id in the query parameter.
    If no id is provided, it defaults to the authenticated user's id.
    Returns user profile details in the response.
    
  Update User Profile (updateUser):
    Allows users to update their profile information.
    Accepts updates for name, phone, address, and profile summary.
    Validates the presence of the user and updates the specified fields.
    Returns the updated user information in the response.
    
  Delete User (deleteUser):
    Deletes the authenticated user based on their user id.
    Checks if the user exists and responds with an error if not found.
    
  Authentication and Authorization:
    Utilizes JWT for token-based authentication.
    Protects certain routes by requiring a valid token for access (e.g., updateUser, deleteUser).
    Provides appropriate error responses for unauthorized access.
    
  Error Handling:
    Handles errors gracefully by providing informative error messages.
    Utilizes try-catch blocks to capture and handle potential errors during database operations.
    Utilized Joi for validating the input data
