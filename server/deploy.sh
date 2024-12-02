#!/bin/bash

script_dir="$(dirname "$0")"
cd $script_dir
zip server.zip *.py *.txt -x "./__pycache__/*" "./.venv/*"
az account show || echo -ne '\n' | az login # pran.singaraju@gmail.com
az webapp deploy -n kinetik-server -g pran.singaraju_rg_7018 --src-path server.zip
rm server.zip