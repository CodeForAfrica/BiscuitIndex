import os

redis_host = os.getenv('REDIS_HOST', 'localhost:6379')
db_host = os.getenv('MYSQL_HOST')

REDIS = dict(
        host=redis_host.split(':')[0],
        port=redis_host.split(':')[1],
        db='0',
        password=os.getenv('REDIS_PASSWORD', None),
        socket_timeout=2,
        socket_connect_timeout=2,
        )

COUNTIES = ['baringo', 'bomet', 'bungoma', 'busia',
            'elgeyo-marakwet', 'embu', 'garissa',
            'homa-bay', 'isiolo', 'kajiado', 'kakamega',
            'kericho', 'kiambu', 'kilifi', 'kirinyaga',
            'kisii', 'kisumu', 'kitui', 'kwale', 'laikipia',
            'lamu', 'machakos', 'makueni', 'mandera',
            'marsabit', 'meru', 'migori', 'mombasa',
            "murang-a", 'nairobi', 'nakuru', 'nandi',
            'narok', 'nyamira', 'nyandarua', 'nyeri',
            'samburu', 'siaya', 'taita-taveta', 'tana-river',
            'tharaka-nithi', 'trans-nzoia', 'turkana',
            'uasin-gishu', 'vihiga', 'wajir', 'west-pokot'
            ]

DATABASE = dict(
        username=db_host.split(',')[0],
        password=db_host.split(',')[1],
        host=db_host.split(',')[2],
        table='BISCUIT_INDEX'
        )

NODATA = ['baringo', 'kirinyaga', 'lamu', 'bomet', 'uasin-gishu']

COMPARATIVES = dict(
        maize=dict(
            name="Maize flour",
            mutable="false",
            amount=124,
            ),
        rent=dict(
            name="Monthly house rent",
            mutable="true",
            amount=None
            ),
        commutes=dict(
            name="Daily commutes",
            mutable="true",
            amount=None
            ),
        fees=dict(
            name="School fees per term",
            mutable="true",
            amount=None
            ),
        dialysis=dict(
            name="Dialysis machine",
            mutable="false",
            amount=3000000
            ),
        )
