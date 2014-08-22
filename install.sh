#! /bin/bash

INSTALL_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ "$(uname)" != "Darwin" ] 
then
	echo "This installer only works on OS X, sorry."
	exit 1
fi

echo -e "\nPlease note this script does not install global dependencies, of which are:\n- Ruby\n- Ruby Gems\n- NPM\n"

echo -e "Installing gems...\n"
bundle install --path vendor/bundle --binstubs=$INSTALL_DIR/bin > $INSTALL_DIR/install.log 2>&1

echo -e "Installing node dependencies...\n"
npm install > $INSTALL_DIR/install.log 2>&1

cd $INSTALL_DIR/assets/scss 2>&1

echo -e "Setting up boubon...\n"
$INSTALL_DIR/bin/bourbon install > $INSTALL_DIR/install.log 2>&1

echo -e "Setting up neat...\n"
$INSTALL_DIR/bin/neat install > $INSTALL_DIR/install.log 2>&1

echo -e "Setting up bitters...\n"
$INSTALL_DIR/bin/bitters install > $INSTALL_DIR/install.log 2>&1

cd $INSTALL_DIR 2>&1

echo -e "All done\n";
