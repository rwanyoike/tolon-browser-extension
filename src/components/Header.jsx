import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const { currentSource, hits, onSourceChange, sourcesList } = props;

  return (
    <>
      <div>
        {sourcesList.map((value) => (
          <button
            key={value}
            className={value === currentSource ? "active" : null}
            onClick={() => onSourceChange(value)}
            type="button"
          >
            {value}
          </button>
        ))}
      </div>
      <div>{hits}</div>
    </>
  );
};

Header.propTypes = {
  currentSource: PropTypes.string.isRequired,
  hits: PropTypes.string.isRequired,
  onSourceChange: PropTypes.func.isRequired,
  sourcesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;
