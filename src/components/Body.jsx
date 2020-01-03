import React from "react";
import PropTypes from "prop-types";

const Result = (props) => {
  const { meta, thread, url } = props;

  return (
    <div className="result">
      <div className="result-title">
        <a href={thread.url} rel="noopener noreferrer" target="_blank">
          {thread.title}
        </a>
      </div>
      <div className="result-url">
        <a href={url} rel="noopener noreferrer" target="_blank" title={url}>
          {url}
        </a>
      </div>
      <div className="result-meta">
        {/* - If `title` is set, set the `text` title attribute
            - If `url` is set, wrap `text` in an anchor element
            - If `url` is not set, wrap `text` in a span element */}
        {meta.map((value) => (
          <div key={value.item} className={`result-${value.item}`}>
            {value.url ? (
              <a
                href={value.url}
                rel="noopener noreferrer"
                target="_blank"
                title={value.title}
              >
                {value.text}
              </a>
            ) : (
              <span title={value.title}>{value.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Result.propTypes = {
  meta: PropTypes.arrayOf(PropTypes.object).isRequired,
  thread: PropTypes.objectOf(PropTypes.string).isRequired,
  url: PropTypes.string.isRequired,
};

const Body = (props) => {
  const { pageResults, searchError, searchQuery } = props;

  if (!searchQuery) {
    return (
      <div className="message">
        <div style={{ marginBottom: "10px" }}>
          <b>Nothing to do on this page</b>
        </div>
        I don&apos;t work on special pages like this one. Try browsing{" "}
        somewhere else.
      </div>
    );
  }

  if (searchError) {
    return <div className="message">{searchError.message}</div>;
  }

  if (!pageResults) {
    return <div className="message">...</div>;
  }

  if (!pageResults.length) {
    return (
      <div className="message">
        Found no <b>threads</b> matching <b>{searchQuery}</b>
      </div>
    );
  }

  return (
    <div className="results">
      {pageResults.map((value) => (
        <Result
          key={value.id}
          meta={value.meta}
          thread={value.thread}
          url={value.url}
        />
      ))}
    </div>
  );
};

Body.propTypes = {
  pageResults: PropTypes.arrayOf(PropTypes.object),
  searchError: PropTypes.instanceOf(Error),
  searchQuery: PropTypes.string,
};

Body.defaultProps = {
  pageResults: undefined,
  searchError: null,
  searchQuery: null,
};

export default Body;
