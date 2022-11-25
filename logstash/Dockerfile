ARG ELASTIC_VERSION

FROM docker.elastic.co/logstash/logstash:${ELASTIC_VERSION}

RUN logstash-plugin install logstash-input-syslog
RUN logstash-plugin install logstash-filter-date
RUN logstash-plugin install logstash-filter-grok
RUN logstash-plugin install logstash-filter-useragent
RUN logstash-plugin install logstash-filter-geoip
RUN logstash-plugin install logstash-output-elasticsearch
