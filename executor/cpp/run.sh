#!/bin/bash

MODE=$1
FILE=$2

if [ "$MODE" = "compile" ]; then

    timeout 10s g++ "files/$FILE.cpp" -o "files/$FILE.out" 2> compile_error.txt

    if [ $? -ne 0 ]; then
        echo "COMPILATION_ERROR"
        cat compile_error.txt
        exit 1
    fi

    echo "COMPILED"
    exit 0
fi


if [ "$MODE" = "run" ]; then

    timeout 2s "./files/$FILE.out" < /dev/stdin
    EXIT_CODE=$?

    if [ $EXIT_CODE -eq 124 ]; then
        echo "TIME_LIMIT_EXCEEDED"
    elif [ $EXIT_CODE -ne 0 ]; then
        echo "RUNTIME_ERROR"
    fi
fi