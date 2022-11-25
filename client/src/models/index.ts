export interface Shards {
  total: number;
  successful: number;
  skipped: number;
  failed: number;
}

export interface Total {
  value: number;
  relation: string;
}

export interface Service {
  type: string;
}

export interface Device {
  name: string;
}

export interface Os {
  version: string;
  name: string;
  full: string;
}

export interface Useragent {
  version: string;
  device: Device;
  name: string;
  os: Os;
}

export interface Facility {
  code: number;
  name: string;
}

export interface Severity {
  code: number;
  name: string;
}

export interface Syslog {
  priority: number;
  facility: Facility;
  severity: Severity;
}

export interface Log {
  syslog: Syslog;
}

export interface Event {
  original: string;
}

export interface Host {
  ip: string;
  hostname: string[];
}

export interface Location {
  lon: number;
  lat: number;
}

export interface Geo {
  region_iso_code: string;
  timezone: string;
  location: Location;
  country_iso_code: string;
  city_name: string;
  continent_code: string;
  region_name: string;
  postal_code: string;
  country_name: string;
}

export interface ClientIp {
  ip: string;
  geo: Geo;
}

export interface Process {
  name: string;
}

export interface LogItem {
  timestamp: string[];
  message: string;
  response: string;
  auth: string;
  '@version': string;
  service: Service;
  httpversion: string;
  xforwardedfor: string;
  request: string;
  tags: string[];
  useragent: Useragent;
  log: Log;
  event: Event;
  host: Host;
  client_ip: ClientIp;
  ident: string;
  '@timestamp': string;
  process: Process;
  referrer: string;
  verb: string;
  bytes: string;
  clientip: string;
}

export interface Hit {
  _index: string;
  _id: string;
  _score: number;
  _ignored: string[];
  _source: LogItem;
}

export interface Hits {
  total: Total;
  max_score: number;
  hits: Hit[];
}

export interface ElasticResponse {
  took: number;
  timed_out: boolean;
  _shards: Shards;
  hits: Hits;
}
