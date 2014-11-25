# Headless Docking and App Launcher 

## Running The Demo

This can be thought of as three distinct projects: the headless launcher, the chart demo and the controller demo. They the headless launcher is the root of this project with the chart and controller embedded as sub projects in the `/app/launched-apps` directory  


###Hosted 
Installer pointing to latest pushed master branch [(windows only) 
here](https://dl.openfin.co/services/download?fileName=headless-launcher-installer&config=https://demoappdirectory.openf.in/desktop/deploy/headless-launcher/app.json) 

###Local Dev
To run locally (**requires node and npm**)

1. Pull in the project
    * `git clone https://github.com/openfin/headless-launcher.git`
    

2. Install dependences and build (run in created project directory)
    * `npm install`
    * `grunt initProject`

3. Host locally
    * ensure that the `url` key in `app/app.json` is pointing to the local `app/index.html` file (http://local:9000)
    * `grunt serve`

4. Provide the [RVM](http://openfin.co/developers.html?url=developers/getting-started/deploy-app.html) with the hosted `app/app.json` file



