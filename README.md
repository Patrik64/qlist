# qlist
quick lists for you and your friends to share

link to deployed test version:
https://qlist.vercel.app/

__to run locally:__

```
npm install 
npm run serve
```

and navigate to:

`http://localhost:8080`

to use with docker:

__for development mode:__

`docker-compose up`

in case you already have an image:

`docker-compose up --build`

open the browser and navigate to:

`http://localhost:8080`

__for production mode:__

`docker build -t dockervue .`

`docker run -p 8080:80 dockervue`

open the browser and navigate to:

`http://localhost:8080`
