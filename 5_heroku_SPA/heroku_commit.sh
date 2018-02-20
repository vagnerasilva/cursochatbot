#!/bin/bash
# Facebook Messenger Heroku Bot
echo "Start! <<<<<<<<<<<<<<<<<<<<<<<<<"
START_TIME="$(date +"%s")"
echo "===== Git add ."
git add .

echo "===== Git commit -m"
if [ -z "$1" ]
then
	git commit -m "develop commit"
else
	git commit -m "'""$1""'"
fi

echo "===== Git push"
git push heroku master

TIME="$(expr $(date +"%s") - $START_TIME)"
echo "Script Finished. Time Taken $TIME s<<<<<<<<<<<<<<<<<<<<<<<<<"