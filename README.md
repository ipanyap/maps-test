Google Maps API Test

1. How to install

Fork from Github
Go to the project directory and run 'npm install'
Define the following environment variable:
	- NODE_ENV=production
	- GOOGLE_MAPS_API_KEY={your own Google Maps API key}
	- DB_URL={your PostgreSQL database address in format: 'postgres://<username>:<password>@<url>:<port>/<db name>'}
Run 'npm run build'

2. How to run

Run 'npm run start'
By default the app will run on port 8080, open the app in the browser

3. How to use

Click anywhere in the map to add a point. The new point should appear on the list
Click 'Delete' on the list item to delete existing point
Click 'Set Origin' on the list item to set as the trip's starting point
Click 'Set Destination' on the list item to set as the trip's finish point
Click 'Calculate Route' to calculate direction from origin point to destination point

--END--