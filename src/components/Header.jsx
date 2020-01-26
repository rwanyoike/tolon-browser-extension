import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const { onSourceChange, currentSource, sources } = props;

  return (
    <>
      <div className="sources">
        {sources.map((value) => (
          <div
            className={value === currentSource ? "active" : null}
            key={value}
          >
            <button onClick={() => onSourceChange(value)} type="button">
              {value}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

Header.propTypes = {
  onSourceChange: PropTypes.func.isRequired,
  currentSource: PropTypes.string.isRequired,
  sources: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;
