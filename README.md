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

alternate deploying with github
git init
Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action
deploys

? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? Yes
? File build/index.html already exists. Overwrite? No
? For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository)
Jamess-Nguyen/recipes-book-fern

✔ Created service account github-action-599863872 with Firebase Hosting admin permissions.
✔ Uploaded service account JSON to GitHub as secret FIREBASE_SERVICE_ACCOUNT_RECIPES_BOOK_FERN.
i You can manage your secrets at https://github.com/Jamess-Nguyen/recipes-book-fern/settings/secrets.

? Set up the workflow to run a build script before every deploy? No

✔ Created workflow file /Users/jamesnguyen/Desktop/recipes-book-fern/.github/workflows/firebase-hosting-pull-request.yml
? Set up automatic deployment to your site's live channel when a PR is merged? Yes
? What is the name of the GitHub branch associated with your site's live channel? master

after go to yammal files in github workflows and under the firsts uses add these - run: npm install - run: npm run build
