#!/bin/bash
# Double-click this file in Finder to start the local preview server
cd "$(dirname "$0")"
echo "Starting D8.Digital local server at http://localhost:3131"
open "http://localhost:3131"
python3 -m http.server 3131
