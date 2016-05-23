testserver:
	flask -a bi --debug run --port=5090

runserver:
	gunicorn -w 5 -b 0.0.0.0:5090 --log-level debug --log-file logs/gunicorn.log core:app &
