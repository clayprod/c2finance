#!/bin/sh
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created default .env file"
else
  echo ".env already exists"
fi
