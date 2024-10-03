#!/bin/bash

cd /var/www/OlharTAXI

# Fetch the latest changes from the remote
git fetch origin develop

# Check if the branch has updates
LOCAL=$(git rev-parse develop)
REMOTE=$(git rev-parse origin/develop)

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "No updates in 'develop'."
else
  echo "'develop' branch has updates. Not running build."
  git pull origin develop
  npm run build
fi
#sudo chmod +x /var/www/OlharTAXI/git-pull-and-build.sh
#[Unit]
#Description=Check Git for updates run npm build if exists and updates are found
#After=network.target

#[Service]
#Type=oneshot
#WorkingDirectory=/var/www/OlharTAXI
#ExecStart=/var/www/OlharTAXI/git-pull-and-build.sh

# vi /etc/systemd/system/git-pull-build.timer
#[Unit]
#Description=Run git-pull-build every hour

#[Timer]
#OnCalendar=hourly
#Persistent=true

#[Install]
#WantedBy=timers.target

#sudo systemctl daemon-reload
#sudo systemctl enable git-pull-build.timer
#sudo systemctl start git-pull-build.timer
#sudo systemctl list-timers git-pull-build.timer
