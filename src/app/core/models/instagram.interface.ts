export interface Posts {
  data:   Datum[];
  paging: Paging;
}

export interface Datum {
  id:             string;
  caption?:       string;
  media_type:     string;
  media_url:      string;
  thumbnail_url?: string;
  permalink:      string;
  timestamp:      string;
}

export interface Paging {
  cursors: Cursors;
}

export interface Cursors {
  before: string;
  after:  string;
}
