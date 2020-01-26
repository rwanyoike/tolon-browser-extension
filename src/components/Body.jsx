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
          <div className={`result-${value.item}`} key={value.item}>
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
  const { error, query, results } = props;

  if (!query) {
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

  if (error) {
    return <div className="message">{error.message}</div>;
  }

  if (!results) {
    return <div className="message">...</div>;
  }

  if (!results.length) {
    return (
      <div className="message">
        Found no <b>threads</b> matching <b>{query}</b>
      </div>
    );
  }

  return (
    <div className="results">
      {results.map((value) => (
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
  error: PropTypes.instanceOf(Error),
  query: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.object),
};

Body.defaultProps = {
  error: null,
  query: null,
  results: undefined,
};

export default Body;
