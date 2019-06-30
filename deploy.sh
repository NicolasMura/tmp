#!/bin/bash

path_ssh_key='/Users/nmura/.ssh/id_rsa';
path_dst='/home/nmura/www-dev/nicolasmura.fr/expelliarmus';

tar czf dist.tar.gz dist/hello-henri/

scp -P 2891 -i $path_ssh_key dist.tar.gz nmura@nicolasmura.fr:$path_dst && echo transfer successful!;
ssh -p 2891 -i $path_ssh_key nmura@nicolasmura.fr bash -c "'
  cd $path_dst
  rm -Rf dist
  sleep 1s
  echo Décompression...
  tar xzf dist.tar.gz
'";
echo done