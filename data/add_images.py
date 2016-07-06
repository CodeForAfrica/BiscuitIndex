import redis, csv
from biscuit_index.bi import config
from normality import slugify

if __name__ == '__main__':
    r = redis.StrictRedis(**config.REDIS)
    records = csv.reader(open('county-gov-images.csv'))
    for record in records:
        county = slugify(record[1])
        gov = record[2]
        print county, gov

        try:
            countydetails = eval(r.get(county))
            countydetails['governor_image'] = gov
            r.set(county, countydetails)
        except Exception, err:
            print err
            pass
