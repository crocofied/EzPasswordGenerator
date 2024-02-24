# Import the required libraries
import fastapi
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import random
import string

# Define the "generate_password" function to generate a random password
def generate_password(length):
    # Which characters to use for the password
    characters = string.ascii_letters + string.digits + "!+.?"
    # Generate a random password
    password = ''.join(random.choice(characters) for i in range(length)) # We substract 1 from length to actually get 12 characters and not 13
    # Return the password
    return password

# Create an instance of the FastAPI class
app = fastapi.FastAPI()

# Add CORS (Cross-Origin Resource Sharing) middleware to the FastAPI app
origins = [
    "http://localhost",
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the password endpoint
@app.get("/password/")
async def get_password(length: int = 15):
    # Return the generated password
    return {"password": generate_password(length)}

# Run the server
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)