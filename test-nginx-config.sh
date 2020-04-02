#!/bin/bash

docker run --rm -t -a stdout --name nginx-tester -v $PWD/:/etc/nginx/:ro nginx:latest nginx -c /etc/nginx/nginx.conf -t