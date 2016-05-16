import redis, csv
from normality import slugify
from biscuit_index.bi import config

if __name__ == '__main__':
    r = redis.StrictRedis(**config.REDIS)

    x=0
    records = csv.reader(open('county-governors.csv'))
    for record in records:
        county = slugify(record[0])
        governor = str(record[1]).strip()
        dep_governor = str(record[2]).strip()
        party = str(record[3]).strip()

        county_data = eval(r.get(county))

        #print "%s -- %s -- %s -- %s" % (county, governor, party, county_data.get('total_budget', "!!!ERR!!!"))

        county_data['governance'] = dict(
                governor=governor,
                deputy_governor=dep_governor,
                party=party
                )
        #print "%s -- %s -- %s -- %s" % (county, governor, party, county_data)
        r.set(county, county_data, xx=True)
        x += 1

    print x
