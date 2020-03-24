#!/bin/bash
certbot renew
cp -a -L -u /etc/letsencrypt/live/mgamlem3.com/. /home/michael/proxy-data/current-certs