from flask import (Flask, g, request, session, redirect,
        url_for, render_template, flash)
from flask_script import Manager
import redis
import os
from biscuit_index.bi import config as config_file
from normality import slugify

app = Flask(__name__)
app.config.from_object(config_file)

def get_db():
    if not hasattr(g, 'redis'):
        g.redis = redis.StrictRedis(**app.config['REDIS'])
    return g.redis

### VIEWS


@app.route('/')
@app.route('/counties')
def counties():
    '''
    counties.html
    '''
    db = get_db()
    counties = app.config['COUNTIES']
    all_counties = {}
    for county in counties:
        county_data = db.get(slugify(county))
        if county_data:
            all_counties[county] = eval(county_data)
    return render_template('counties.html', counties=all_counties)



@app.route('/counties/<county>')
def county_page(county):
    '''
    county_page.html
    '''
    db = get_db()
    county_data = db.get(slugify(county))
    return render_template('county_page.html', county_data=eval(county_data))


### END OF VIEWS

manager = Manager(app)

if __name__ == "__main__":
    manager.run()

