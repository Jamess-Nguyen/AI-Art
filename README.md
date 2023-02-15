# book

Note to self
-react 17.0.2 https://stackoverflow.com/questions/46566830/how-to-use-create-react-app-with-an-older-react-versionhttps://stackoverflow.com/questions/46566830/how-to-use-create-react-app-with-an-older-react-version
-Start project by installing firebase-tools "npm install firebase-tools"
-Log into firebase account "firebase login"
-After you create firebase app run "firebase init"
select ❯◯ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
use arrow keys confirm with space bar hit enter
select existing project
? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No

AFter this you deploy by running "yarn build" (building production form)
then run "firebase deploy" to push it to your db
