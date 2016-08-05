testserver:
	compass compile && flask -a bi --debug run --port=5090

run:
	compass compile && gunicorn --workers 3 --bind unix:biscuit_index.sock --log-level debug --log-file logs/gunicorn.log core:app  &
