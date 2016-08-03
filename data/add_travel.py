import redis, csv
from biscuit_index.bi import config
from normality import slugify

if __name__ == '__main__':
    r = redis.StrictRedis(**config.REDIS)
    records = csv.reader(open('county-data-3.csv'))
    for record in records:
        county = slugify(record[0])
        budget = str(record[1])
        exp = str(record[2])

        try:
            travel = dict(
                    expenditure=exp,
                    budget=budget
                    )
            countydetails = eval(r.get(county))
            countydetails['travel'] = travel
            print county, travel
            r.set(county, countydetails)
        except Exception, err:
            print err
            pass
