export interface Result {
  id: string;
  thread: {
    title: string;
    url: string;
  };
  url: string;
  meta: {
    item: string;
    text: string;
    title?: string;
    url?: string;
  }[];
}

export interface Session {
  [key: string]: string;
}

export interface Results {
  results: Result[];
  searchHits: string;
  hasNext: boolean;
  session: Session;
}

export interface Source {
  name: string;
  handleSearch: (url: string, session: Session) => Promise<Results>;
  theme: string;
}
