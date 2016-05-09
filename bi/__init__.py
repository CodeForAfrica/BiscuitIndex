from flask import (Flask, g, request, session, redirect,
        url_for, render_template, flash)
import redis
import os
from biscuit_index.bi import config as config_file

app = Flask(__name__)
app.config.from_object(config_file)

def get_db():
    if not hasattr(g, 'redis'):
        g.redis = redis.StrictRedis(**app.config['REDIS'])
    return g.redis

### VIEWS

@app.route('/')
def home():
    db = get_db()
    counties = app.config['COUNTIES']
    county_details = {}
    if request.args:
        county = request.args['county']
        county_details[county] = db.get(county)
    else:
        for county in counties:
            values = db.get(county)
            county_details[county] = values

    return render_template('layout.html', counties=county_details)


### END OF VIEWS
