import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

import "./App.css";
import "./App.theme.css";

const App = (props) => {
  const { searchQuery, sourcesDict, sourcesList } = props;

  const [currentSource, setCurrentSource] = useState(sourcesList[0]);
  const [store, setStore] = useState(() => {
    const state = {};
    for (let idx = 0; idx < sourcesList.length; idx += 1) {
      state[sourcesList[idx]] = {
        results: {}, // result pages => list
        hits: "∞", // search hits
        lazyPageCount: 1, // lazy page count
        pageIndex: 0, // current page
        session: {}, // source session
      };
    }
    return state;
  });
  const [error, setError] = useState(null);

  if (!sourcesList.length) {
    return (
      <div className="app">
        <div className="header" />
        <div className="body">
          <div className="message">
            No <b>active sources</b> configured. Exiting...
          </div>
        </div>
        <div className="footer" />
      </div>
    );
  }

  const sourceStore = store[currentSource];
  const pageResults = sourceStore.results[sourceStore.pageIndex];

  useEffect(() => {
    setError(null);

    // A non-http or src cached page
    if (!searchQuery || pageResults) {
      return;
    }

    (async () => {
      try {
        const { handleSearch } = sourcesDict[currentSource];
        const response = await handleSearch(searchQuery, sourceStore.session);
        const { results, hits, hasNext, session } = response;
        sourceStore.results[sourceStore.pageIndex] = results;
        sourceStore.hits = hits;
        if (hasNext) {
          sourceStore.lazyPageCount += 1;
        }
        sourceStore.session = session;
        setStore((prevStore) => ({
          ...prevStore,
          [currentSource]: sourceStore,
        }));
      } catch (error_) {
        setError(error_);
      }
    })();
  }, [currentSource, store]);

  const handleIndexChange = (change) => {
    sourceStore.pageIndex += change;
    setStore((prevStore) => ({
      ...prevStore,
      [currentSource]: sourceStore,
    }));
  };

  return (
    <div className="app" data-source={currentSource}>
      <div className="header">
        <Header
          currentSource={currentSource}
          hits={sourceStore.hits.toString()}
          onSourceChange={setCurrentSource}
          sourcesList={sourcesList}
        />
      </div>

      <div className="body">
        <Body
          pageResults={pageResults}
          searchError={error}
          searchQuery={searchQuery}
        />
      </div>

      <div className="footer">
        <Footer
          onIndexChange={handleIndexChange}
          pageCount={sourceStore.lazyPageCount}
          pageIndex={sourceStore.pageIndex}
        />
      </div>
    </div>
  );
};

App.propTypes = {
  searchQuery: PropTypes.string,
  sourcesDict: PropTypes.objectOf(PropTypes.object).isRequired,
  sourcesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

App.defaultProps = {
  searchQuery: null,
};

export default App;
