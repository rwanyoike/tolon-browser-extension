import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { initStore, initIsLoading } from "./utils";

import Header from "./components/Header";
import Options from "./components/Options";
import Body from "./components/Body";
import Footer from "./components/Footer";

import "./App.css";
import "./App.theme.css";

const App = (props) => {
  const { prevOptions, query, sources, src } = props;

  // Current active source
  const [currentSource, setCurrentSource] = useState(sources[0]);
  // Layered object {[source]: {...}}
  const [store, setStore] = useState(() => initStore(sources));
  // Raised handleSearch error
  const [error, setError] = useState(null);
  // Layered object {[source]: bool }
  const [isLoading, setIsLoading] = useState(() => initIsLoading(sources));
  // Extension options
  const [options, setOptions] = useState(prevOptions);
  // Show the extension options
  const [showOptions, setShowOptions] = useState(false);

  const sourceStore = store[currentSource];

  useEffect(() => {
    setError(null);

    // A non-http, loading, or cached page
    if (
      !query ||
      isLoading[currentSource] ||
      sourceStore.results[sourceStore.pageIndex]
    ) {
      return;
    }

    setIsLoading((prevValue) => ({
      ...prevValue,
      [currentSource]: true,
    }));

    (async () => {
      try {
        const { handleSearch } = src[currentSource];
        const response = await handleSearch(query, sourceStore.session);
        const { results, hits, hasNext, session } = response;
        sourceStore.results[sourceStore.pageIndex] = results;
        sourceStore.hits = hits;
        if (hasNext) {
          sourceStore.lazyPageCount += 1;
        }
        sourceStore.session = session;
        setStore((prevValue) => ({
          ...prevValue,
          [currentSource]: sourceStore,
        }));
      } catch (error_) {
        setError(error_);
      }

      setIsLoading((prevValue) => ({
        ...prevValue,
        [currentSource]: false,
      }));
    })();
  }, [currentSource, store]);

  const handleIndexChange = (change) => {
    sourceStore.pageIndex += change;
    setStore((prevValue) => ({
      ...prevValue,
      [currentSource]: sourceStore,
    }));
  };

  const handleOptionsSave = (key, value) => {
    (async () => {
      if (typeof browser === "object") {
        await browser.storage.local.set({ [key]: value });
      }
      setOptions((prevValue) => ({
        ...prevValue,
        [key]: value,
      }));
    })();
  };

  return (
    <div
      className="app"
      data-dark-mode={options.darkMode}
      data-source={currentSource}
    >
      <div className="header">
        {showOptions ? (
          <div />
        ) : (
          <Header
            onSourceChange={setCurrentSource}
            currentSource={currentSource}
            sources={sources}
          />
        )}
        <div className="options">
          <button
            onClick={() => setShowOptions((prevValue) => !prevValue)}
            title="Show Options"
            type="button"
          >
            [ ? ]
          </button>
        </div>
      </div>
      <div className="body">
        {showOptions ? (
          <Options onOptionsChange={handleOptionsSave} options={options} />
        ) : (
          <Body
            error={error}
            query={query}
            results={sourceStore.results[sourceStore.pageIndex]}
          />
        )}
      </div>
      <div className="footer">
        {!showOptions && (
          <Footer
            onIndexChange={handleIndexChange}
            count={sourceStore.lazyPageCount}
            hits={sourceStore.hits.toString()}
            index={sourceStore.pageIndex}
          />
        )}
      </div>
    </div>
  );
};

App.propTypes = {
  prevOptions: PropTypes.objectOf(PropTypes.any).isRequired,
  query: PropTypes.string,
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  src: PropTypes.objectOf(PropTypes.object).isRequired,
};

App.defaultProps = {
  query: null,
};

export default App;
