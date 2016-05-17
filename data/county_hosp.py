import redis, csv
from normality import slugify
from biscuit_index.bi import config

if __name__ == '__main__':
    r = redis.StrictRedis(**config.REDIS)

    x=0
    records = csv.reader(open('county_hospitality_data.csv'))
    for record in records:
        if record[0] == 'county':
            continue
        county = slugify(record[0])
        hospitality_budget = str(record[1])
        total_budget = str(record[2])

        county_data = eval(r.get(county))
        #print "%s -- %s -- %s -- %s" % (county, hospitality_budget, total_budget, county_data.get('total_budget', "!!!ERR!!!"))

        county_data['total_budget'] = total_budget
        county_data['hospitality_budget'] = hospitality_budget

        r.set(county, county_data)
        print "Updated %s:  %s" % (county, county_data)
        x += 1

    print "Made %s loops" % x
