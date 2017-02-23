## Google Maps API Test

## How to install


1. Fork from Github

2. Go to the project directory and run 'npm install'

3. Define the following environment variable:

- NODE_ENV=production

- GOOGLE_MAPS_API_KEY={your own Google Maps API key}

- DB_URL={your PostgreSQL database address in format: 'postgres://(username):(password)@(url):(port)/(db name)'}

4. Run 'npm run build'


## How to setup database


1. Create a database with PostgreSQL

2. Run the script 'src/data/init.sql'


## How to run


1. Run 'npm run start'

2. By default the app will run on port 8080, open the app in the browser


## How to use


1. Click anywhere in the map to add a point. The new point should appear on the list

2. Click 'Delete' on the list item to delete existing point

3. Click 'Set Origin' on the list item to set as the trip's starting point

4. Click 'Set Destination' on the list item to set as the trip's finish point

5. Click 'Calculate Route' to calculate direction from origin point to destination point


Enjoy!