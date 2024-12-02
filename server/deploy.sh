#!/bin/bash

script_dir="$(dirname "$0")"
cd $script_dir
zip server.zip *.py *.txt -x "./__pycache__/*" "./.venv/*"
az account show || echo -ne '\n' | az login # use axk210090@utdallas.edu + password
az webapp deploy -n kinetik-flask-server -g kinetikflaskapprg --src-path server.zip
rm server.zip