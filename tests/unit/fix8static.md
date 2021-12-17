<div align="center">
  <img alt="fix8" height="200" src="static/fix8.jpg" />

  <br />
  <br />

  <h1>
    fix8mtstatic
  </h1>
  <br />
  <br />
</div>

source code for the Fix8MT website (https://fix8mt.com)

## 📚&nbsp;&nbsp;Table of Contents

1. [Local Development](<#local-development>)
    1. [development mode](<#development-mode>)
    1. [production mode](<#production-mode>)
1. [Deployment](<#deployment>)
    1. [CircleCI environment variables](<#circleci-environment-variables>)
1. [Implementation](<#implementation>)
    1. [Libraries and Plugins](<#libraries-and-plugins>)
    1. [Pages](<#pages>)
        1. [contact page](<#contact-page>)
        1. [releases page](<#releases-page>)
1. [Notes](<#%EF%B8%8Fnotes>)

## 🔧&nbsp;&nbsp;Local Development

To run the project locally on your machine be sure you to have [nodejs](https://nodejs.org/en/) (>= 14.0) and [npm](https://www.npmjs.com/) installed.
  
### development mode
For development mode type:

``npm run develop``

and point your browser to ``localhost:8080``  

In case that port is used, check the command line, it will display the port where the site is served for development.

### production mode
To build the project for production type:

``npm run build``

If you wish to test the production code on your local machine you can use [http-server](https://www.npmjs.com/package/http-server).  
To install it type:

``npm install -g http-server``

and to run the built project in production mode type:

```
cd dist
http-server .
```


## 🚀&nbsp;&nbsp;Deployment

deployment of this project is performed and automatically triggered by [CircleCI](https://circleci.com/) workflow (the complete configuration code is in ``.circleci/config.yml``)
upon a commit into this repository.

If a commit is made into ``dev`` branch, the CicrleCI workflow will build the project and copy it to an S3 bucket named ``ratwy3p5oq-test``.  
Upon the completion of the CircleCI workflow the following link will serve the site:  

http://ratwy3p5oq-test.s3-website-ap-southeast-2.amazonaws.com

If a commit is made into ``main`` branch, the CicrleCI pipline will build the project and copy it to an S3 bucket named ``z1oryk1qg-prod``.  
Upon the completion of the CircleCI workflow the following link will serve the site:  

https://fix8mt.com/

  ### CircleCI environment variables

  CircleCI workflow uses 4 environment variables:

  | Name                  | Value                | 
  | ----------------------|:--------------------:| 
  | S3_BUCKET             | s3://ratwy3p5oq-test | 
  | S3_BUCKET_PROD        | s3://z1oryk1qg-prod  |
  | AWS_ACCESS_KEY_ID     | XXXX                 |
  | AWS_SECRET_ACCESS_KEY | XXXX                 |

  For values of AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY visit the [confluence documentation page](https://fix8mt.atlassian.net/wiki/spaces/PROJ/pages/14123009/Fix8MT+Web+Services).  
  Those two variables are used to enable aws-cli, so that CircleCI can copy the resulting build over to AWS.
  
  Since the same ``config.yml`` script is used for ``dev`` and ``main`` branch, the initial value of S3_BUCKET variable which points to the S3 test bucket will be overwritten with the value of S3_BUCKET_PROD variable for ``main`` branch workflow, so that the resulting ``main`` branch build ends up in a S3 production bucket that is hooked over CloudFront to serve the pages under [fix8mt.com](https://fix8mt.com/).
  
  excerpt from ``config.yml`` where this action is performed:
  ```
  if [ "$CIRCLE_BRANCH" == "main" ];
  then
    echo 'export S3_BUCKET="$S3_BUCKET_PROD"' >> $BASH_ENV
  fi
  ```
  
  

## 📄&nbsp;&nbsp;Implementation

project is created using [Gridsome](https://gridsome.org/) framework which provides [Vue.js](vuejs.org/) and [graphql](https://graphql.org/) support.

  ### Libraries and Plugins
  the following libraries and gridsome plugins are used in the project:
  - [@gridsome/plugin-sitemap](https://gridsome.org/plugins/@gridsome/plugin-sitemap)  
  used to create sitemap.xml file for the site

  - [@gridsome/source-filesystem](https://gridsome.org/plugins/@gridsome/source-filesystem)
  - [@gridsome/transformer-remark](https://gridsome.org/plugins/@gridsome/transformer-remark)  
  both used for releases page graphql support

  - [gridsome-plugin-brotli](https://gridsome.org/plugins/gridsome-plugin-brotli)  
  used to create [Brotli](https://en.wikipedia.org/wiki/Brotli) compresson of js and css files

  - [bootstrap](https://getbootstrap.com/)  
  css+javascript library that provides styling and controls for the site

  - [bootstrap-vue](https://bootstrap-vue.org/)  
  vue wrapper around the bootstrap library
  
  - [vue-highlightjs](https://www.npmjs.com/package/vue-highlightjs)  
  vue library for syntax highlighting used on the developers page

  All libraries and plugins are mentioned in ``package.json`` file.
  
  Additionally, the script for [Drift](https://www.drift.com/) service is located in the ``static`` folder.
  The script is included over the header link in ``src/main.js``.

  ### Pages
  There are in all 10 pages:
  - [404](https://fix8mt.com/error)
  - [index](https://fix8mt.com)
  - [about](https://fix8mt.com/about/)
  - [contact](https://fix8mt.com/contact/)
  - [developers](https://fix8mt.com/developers/)
  - [faqs](https://fix8mt.com/faqs/)
  - [features](https://fix8mt.com/features/)
  - [matching-engine](https://fix8mt.com/matching-engine/)
  - [performance](https://fix8mt.com/performance/)
  - [releases](https://fix8mt.com/releases/)

    Two of them are a bit different than the rest which are a simple static html pages:

    #### contact page
    located in ``src/pages/Contact.vue`` is a form that sends the user contact data to the [Basin](https://usebasin.com/) service using the following endpoint:

    ``https://usebasin.com/f/f1c316744c88``

    #### releases page
    located in ``src/pages/Releases.vue`` utilizes graphql functionality to display a list of releases.

    Each release is located in a markdown (``.md``) file found in `content/releases/`.

    The release markdown file is made of two parts:
    - frontmatter consisting of the first 4 lines of the file (anything between ``---`` and ``---`` including those)
    - the rest of the file that can be anything

    Frontmatter has a title and date fields. Date is especially important because it governs how the list of releases will be sorted.  
    
    Here is an example of a frontmatter from the ``release_20_12.md`` file:
    
    ```
    ---
    title: 20.12 release
    date: 2021-01-07
    ---
    ```

    To remove a release from the site, simply remove the markdown file containing that release and commit the change.  

    To add a new release, simply add a new file, you can name it as you like as long as it has ``.md`` extension.  
    Create a frontmatter in the new file and add some content.  
    Commit and that is it.
  
## ⚠️&nbsp;&nbsp;Notes

- If you are using an ad blocker the Drift service will not work (it is a documented problem by Drift).  
- Drift script is disabled for local development mode.  
If you wish to enable it replace the following line in ``src/main.js``:

```
src: (process.env.NODE_ENV === 'development')?  '' :  'drift.js',
```

with 

```
src: 'drift.js',
```
