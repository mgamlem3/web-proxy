#!/bin/bash
certbot certonly --webroot -w /home/michael/proxy-data -d mgamlem3.com -d git.mgamlem3.com --dry-run
cp -a -L -u /etc/letsencrypt/live/mgamlem3.com/. /home/michael/proxy-data/current-certs