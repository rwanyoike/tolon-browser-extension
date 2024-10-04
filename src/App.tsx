import { useEffect, useState } from "react";
import { useImmer } from "use-immer";

import * as css from "./App.css";
import { Body } from "./components/Body";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import type * as ty from "./types";

interface MainStore {
  [key: string]: {
    isLoading: boolean;
    searchHits: string;
    pages: {
      [key: string]: {
        error: Error | null;
        items: ty.Result[];
      };
    };
    pageCount: number; // lazy
    pageIndex: number;
    session: ty.Session;
  };
}

const initStore = (sources: ty.Source[]): MainStore => {
  return Object.fromEntries(
    sources.map((source) => [
      source.name,
      {
        isLoading: false,
        searchHits: "∞",
        pages: {},
        pageCount: 1, // lazy
        pageIndex: 0,
        session: {},
      },
    ]),
  );
};

interface MainProps {
  /** Enabled sources */
  sources: ty.Source[];
  /** The webpage URL */
  query: string | null;
}

export const Main = (props: MainProps) => {
  // Nested appStore
  const [store, setStore] = useImmer(() => initStore(props.sources));
  // Current source
  const [source, setSource] = useState(props.sources[0]);

  const delError = () => {
    setStore((draft) => {
      delete draft[source.name].pages[draft[source.name].pageIndex];
    });
  };

  const setIndex = (amount: number) => {
    setStore((draft) => {
      draft[source.name].pageIndex += amount;
    });
  };

  useEffect(() => {
    // A non-http page, isLoading or cached page
    if (
      props.query === null ||
      store[source.name].isLoading ||
      store[source.name].pages[store[source.name].pageIndex]
    ) {
      return;
    }

    (async (pageIndex: number) => {
      try {
        setStore((draft) => {
          draft[source.name].isLoading = true;
        });
        const results = await source.handleSearch(
          props.query!,
          store[source.name].session,
        );
        setStore((draft) => {
          draft[source.name].isLoading = false;
          draft[source.name].searchHits = results.searchHits;
          draft[source.name].pages[pageIndex] = {
            error: null,
            items: results.results,
          };
          if (results.hasNext) draft[source.name].pageCount += 1;
          draft[source.name].session = results.session;
        });
      } catch (error) {
        setStore((draft) => {
          draft[source.name].isLoading = false;
          draft[source.name].pages[pageIndex] = {
            error: error as Error,
            items: [],
          };
        });
      }
    })(store[source.name].pageIndex);
  }, [props, store, source]);

  return (
    <div className={[css.container, source.theme].join(" ")}>
      <Header
        currentSource={source}
        onSourceChange={setSource}
        sources={props.sources}
      />
      <Body
        query={props.query}
        {...store[source.name].pages[store[source.name].pageIndex]}
        onErrorRemove={delError}
      />
      <Footer
        currentIndex={store[source.name].pageIndex}
        onIndexChange={setIndex}
        pageCount={store[source.name].pageCount}
        searchHits={store[source.name].searchHits}
      />
    </div>
  );
};
