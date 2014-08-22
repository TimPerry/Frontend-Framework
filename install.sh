#! /bin/bash

DIR="$( dirname $0 )" 

if [ "$(uname)" != "Darwin" ] 
then
	echo "This installer only works on OS X, sorry."
	exit 1
fi

echo -e "Please note this script does not install global dependencies, of which are:\n- Ruby\n- Ruby Gems\n- NPM\n"

echo -e "Installing gems...\n"
bundle install --path vendor/bundle --binstubs=$DIR/bin > $DIR/install.log 2>&1

echo -e "Installing node dependencies...\n"
npm install > $DIR/install.log 2>&1

cd $DIR/assets/scss 2>&1

echo -e "Setting up boubon...\n"
$DIR/bin/bourbon install > $DIR/install.log 2>&1

echo -e "Setting up neat...\n"
$DIR/bin/neat install > $DIR/install.log 2>&1

cd $DIR 2>&1

echo -e "All done\n";
