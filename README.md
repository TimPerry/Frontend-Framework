# Frontend Framework

Simple frontend framework uses Bourbon, Neat, Bitters, Bower and GruntJS.

## Install

To install make sure you have:
- A decent version of ruby installed e.g. >= 1.9
- Ruby gems setup.
- NodeJS installed.

One all of these are installed you should be good to run the installer:

```
./install.sh
```

This will installs the the dependencies such as Bourbon as well as all the stuff for grunt and you should be good to go.

### Troubleshooting
All output is logged to ./install.log - look in there if you have any problems.


## Installing packages using bower

The installer moves or aliases all bin files to the bin folder, if you want to use bower for example you would move into the root directory and run:

```
bin/bower install jquery
```
