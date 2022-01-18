# Driveby Restaurant Webapp - Software Engineering Project

<img src='https://github.com/HamzaTatheer/SoftwareEngineeringProject/blob/main/misc/demo.png?raw=true'>
<div style="display:inline">
<img src='https://github.com/HamzaTatheer/SoftwareEngineeringProject/blob/main/misc/menu.png?raw=true' width = '200px' height='112px' />
<img src='https://github.com/HamzaTatheer/SoftwareEngineeringProject/blob/main/misc/checkout.png?raw=true' width = '200px' height='112px' />
<img src='https://github.com/HamzaTatheer/SoftwareEngineeringProject/blob/main/misc/Customer%20Panel%20-%20Status.png?raw=true' width='200px' />
<img src='https://github.com/HamzaTatheer/SoftwareEngineeringProject/blob/main/misc/Customer%20Panel%20_chat.png?raw=true' width = '200px' />
</div>

# Running the backend

- cd into the ~/backend folder.

- create a file inside backend called .env if not already created and add these

    DB_URL='mongodb://root:example@localhost:27017'
    JWT_PRIVATE_KEY='SEproj_jwtPrivateKey'
    PORT=3000

    you can change DB_URL with the the mongo url you are using eg. "mongodb://localhost/Project".

- after that you will run "npm install" if you just pulled or cloned the remote repo. Otherwise not needed.

- after that you will run "npm start".

- this will run the backend program.




# Running the Front-end

- cd into the ~/webapp folder.

- make sure you have yarn installed.

- open terminal and run "yarn install".

- after yarn has finished downloading all the necessary items.

- run "yarn start".

- the webapp will run and will give you an address that you can open in your browser.
