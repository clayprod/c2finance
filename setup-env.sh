#!/bin/sh

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created default .env file"
else
  echo ".env already exists"
fi

if [ ! -f .env.test ]; then
  cp .env.example .env.test
  echo "Created default .env.test file"
else
  echo ".env.test already exists"
fi
