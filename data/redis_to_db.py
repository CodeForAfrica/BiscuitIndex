import redis
import dataset
from biscuit_index.bi import config


def get_db():
    return dataset.connect('mysql://{username}:{password}@{host}'.format(**config.DATABASE))

def get_table(db):
    return db[config.DATABASE['table']]

if __name__ == "__main__":
    r = redis.StrictRedis(**config.REDIS)
    db = get_db()
    db_table = get_table(db)
    keys = r.keys("*")
    for key in keys:
        payload = eval(r.get(key))
        for k in payload:
            if isinstance(payload[k], dict):
                payload[k] = str(payload[k])
        #print payload
        db_table.insert(payload)
        print "inserted %s" % key
