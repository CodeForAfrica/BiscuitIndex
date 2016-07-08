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
    biscuit_budget_str = eval(county_data).get('hospitality_budget', 0)
    if not biscuit_budget:
        biscuit_budget = 0
    if isinstance(biscuit_budget, int) or biscuit_budget.isdigit():
        biscuit = biscuit_budget
    else: # 
        for x in biscuit_budget.replace('million', '').split():
            biscuit = "%s000000" % int(float(x))
    return render_template('index.html', biscuit_budget=int(biscuit), biscuit_budget_str=biscuit_budget_str)


@app.route('/data.json')
def data():
    '''
    '''
    args = request.args.copy()
    db = get_db()
    resp = dict()
    lst = []
    for county in app.config['COUNTIES']:
        county_details = eval(db.get(county))
        resp[county] = county_details
        try:
            biscuit_budget = county_details.get('hospitality_budget', '0')
            if not str(biscuit_budget).isdigit() and str(biscuit_budget):
                for x in biscuit_budget.replace('million', '').split():
                    biscuit_budget_int = "%s000000" % int(float(x))
                resp[county]['biscuit_budget_int'] = int(biscuit_budget_int)
            else:
                if not biscuit_budget:
                    biscuit_budget = 0
                resp[county]['biscuit_budget_int'] = int(biscuit_budget)
            print "%s ====== %s" % (county, resp[county]['biscuit_budget_int'])
            lst.append(dict(county=county, biscuit_budget_int=resp[county]['biscuit_budget_int']))
                
        except Exception, err:
            print "ERROR: '%s' failed to sort: %s" % (county, err)
            raise err

    sorted_resp = sorted(lst, key=lambda k: k['biscuit_budget_int'])

    if args.get('sorted'):
        return jsonify(sorted_resp)
    else:
        return jsonify(resp)


### END OF VIEWS

manager = Manager(app)

if __name__ == "__main__":
    manager.run()
