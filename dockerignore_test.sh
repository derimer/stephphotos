#!/bin/bash
docker run --rm -v $PWD:/src -w /src busybox find . -type f | sort
