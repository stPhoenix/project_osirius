#!/bin/bash

# Run the command and capture its output using grep
output=$(python manage.py migrate | grep "No migrations to apply")

# Define the expected length of the output
expected_length=1  # Change this to your expected length value

# Get the actual length of the captured output
actual_length=${#output}

# Compare the actual length with the expected length
if [ "$actual_length" -ge "$expected_length" ]; then
    echo "Db filled - skip"
    exit 0  # Exit with an error status
else
    echo "Filling db with data"
    python manage.py createcats
    python manage.py createlangs
    python manage.py createwords
    exit 0  # Exit with a success status
fi
