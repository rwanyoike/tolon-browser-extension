import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Header from "./components/Header";
import Options from "./components/Options";
import Body from "./components/Body";
import Footer from "./components/Footer";

import "./App.css";
import "./App.theme.css";

const App = (props) => {
  const {
    initOptions,
    onOptionsChange,
    searchQuery,
    sources,
    sourcesList,
  } = props;

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
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(() => {
    if ({}.hasOwnProperty.call(initOptions, "darkMode")) {
      return initOptions;
    }
    return { darkMode: false };
  });

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
        const { handleSearch } = sources[currentSource];
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

  const handleShowOptions = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const handleOptionsSave = (key, value) => {
    setOptions((prevOptions) => {
      const newSettings = {
        ...prevOptions,
        [key]: value,
      };
      onOptionsChange(newSettings);
      return newSettings;
    });
  };

  return (
    <div
      className="app"
      data-dark-mode={options.darkMode}
      data-source={currentSource}
    >
      <div className="header">
        {showOptions ? (
          <Header
            currentSource=""
            onShowOptions={handleShowOptions}
            onSourceChange={() => {}}
            sourcesList={[]}
          />
        ) : (
          <Header
            currentSource={currentSource}
            onShowOptions={handleShowOptions}
            onSourceChange={setCurrentSource}
            sourcesList={sourcesList}
          />
        )}
      </div>

      <div className="body">
        {showOptions ? (
          <Options onOptionsChange={handleOptionsSave} options={options} />
        ) : (
          <Body
            pageResults={pageResults}
            searchError={error}
            searchQuery={searchQuery}
          />
        )}
      </div>

      <div className="footer">
        {!showOptions && (
          <Footer
            hits={sourceStore.hits.toString()}
            onIndexChange={handleIndexChange}
            pageCount={sourceStore.lazyPageCount}
            pageIndex={sourceStore.pageIndex}
          />
        )}
      </div>
    </div>
  );
};

App.propTypes = {
  initOptions: PropTypes.objectOf(PropTypes.any).isRequired,
  onOptionsChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  sources: PropTypes.objectOf(PropTypes.object).isRequired,
  sourcesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

App.defaultProps = {
  searchQuery: null,
};

export default App;
