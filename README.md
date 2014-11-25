# Headless Docking and App Launcher 

## Running The Demo

This can be thought of as three distinct projects: the headless launcher, the chart demo and the controller demo. They the headless launcher is the root of this project with the chart and controller embedded as sub projects in the `/app/launched-apps` directory  


###Hosted 
Installer pointing to latest pushed master branch [(windows only) 
here](https://dl.openfin.co/services/download?fileName=headless-launcher-installer&config=https://demoappdirectory.openf.in/desktop/deploy/headless-launcher/app.json) 

###Local Dev
To run locally (**requires node and npm to build**)

1. Pull in the project
    * `git clone https://github.com/openfin/headless-launcher.git`
    

2. Install dependences and build (run in created project directory)
    * `npm install`
    * `grunt shell` (will take a bit, it installs all the sub dev tools and builds project)

3. Host locally
    * ensure that the `url` key in `app/app.json` is pointing to the local `app/index.html` file (http://local:9000)
    * `grunt serve`

4. Provide the [RVM](http://openfin.co/developers.html?url=developers/getting-started/deploy-app.html) with the hosted `app/app.json` file


##Project Structure

* Each of the three projects was scaffolded out with the [Angular Yeoman Generator](https://github.com/yeoman/generator-angular). 
* The main entry point is `app/scripts/contollers/main.js`. Here we set up some messaging, and kick off the child apps. 
* Modules supporting messaging and docking that are shared between the apps can be found in the `modules` directory 



