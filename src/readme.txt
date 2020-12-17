# Start http server to serve images from local
# Workaround for "Not allowed to load local resource" error

Install npm http-server plugin at global level (one-time setup)
npm install -g http-server

Go to the root folder that serve you the files
For this project, the root folder is "C:\D\Projects\floret-with-react\floretapp"

Navigate to the root folder and open a command prompt and execute the below command
http-server ./

Bosch laptop name in network: cob1103297.cob.apac.bosch.com

GIT settings
Navigate to C:\D\Projects\floret-with-react\floretapp
Open Git Bash from floretapp
git init
git add .
git commit -m "commit_message"
Create a new repository in Github (https://github.com/uraajan/floret-app-frontend)
Back to git bash window
git remote add origin https://github.com/uraajan/floret-app-frontend
git branch -M master
git push origin master
