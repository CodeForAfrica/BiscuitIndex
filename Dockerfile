FROM ubuntu
MAINTAINER Andrew Kamau <andrew@codeforafrica.org>

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
RUN apt-get install -y redis-server

ENV BISCUIT_INDEX_STATIC /biscuit_index/_static/assets
ENV BISCUIT_INDEX_TEMPLATES /biscuit_index/_static
ENV PYTHONPATH=/
ENV REDIS_HOST=127.0.0.1:6378
ENV REDIS_PASSWORD=14c14663-4a4f-4fb1-9ca6-3a11209176fb

# Begin python festivities
COPY requirements.txt /tmp/requirements.txt
RUN pip install -q --upgrade pip && pip install -q functools32 \
  && pip install -q -r /tmp/requirements.txt

COPY . /biscuit_index
WORKDIR /biscuit_index
RUN rm -rf /biscuit_index/.git

RUN redis-server /etc/redis.conf &

ENTRYPOINT ["python"]
CMD ["core.py"]
