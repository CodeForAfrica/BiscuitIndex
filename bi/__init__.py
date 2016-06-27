from flask import (Flask, g, request, session, redirect,
        url_for, render_template, jsonify)
from flask_script import Manager
import redis
import os
from biscuit_index.bi import config as config_file
from normality import slugify

app = Flask(__name__,
        template_folder=os.getenv('BISCUIT_INDEX_TEMPLATES'),
        static_folder=os.getenv('BISCUIT_INDEX_STATIC'))
app.config.from_object(config_file)

def get_db():
    if not hasattr(g, 'redis'):
        g.redis = redis.StrictRedis(**app.config['REDIS'])
    return g.redis

### VIEWS


@app.route('/')
def counties():
    '''
    index.html
    '''
    if not request.args:
        return render_template('index.html')
    args = request.args.copy()
    county = args['county']
    db = get_db()
    county_data = db.get(slugify(county))
    print "DEBUG: %s  -  %s" % (slugify(county), county_data)
    biscuit_budget = eval(county_data).get('hospitality_budget', 0)
    if not biscuit_budget:
        biscuit_budget = 0
    if isinstance(biscuit_budget, int) or biscuit_budget.isdigit():
        biscuit = biscuit_budget
    else: # 
        for x in biscuit_budget.replace('million', '').split():
            biscuit = "%s000000" % int(float(x))
    return render_template('index.html', biscuit_budget=int(biscuit))


@app.route('/data.json')
def data():
    '''
    '''
    db = get_db()
    resp = dict()
    for county in app.config['COUNTIES']:
        county_details = db.get(county)
        resp[county] = county_details
    return jsonify(resp)


### END OF VIEWS

manager = Manager(app)

if __name__ == "__main__":
    manager.run()
