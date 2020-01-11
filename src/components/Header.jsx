import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const { currentSource, onShowOptions, onSourceChange, sourcesList } = props;

  return (
    <>
      <div className="sources">
        {sourcesList.map((value) => (
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
      <div className="options">
        <button
          onClick={() => onShowOptions()}
          title="Show Options"
          type="button"
        >
          [ ? ]
        </button>
      </div>
    </>
  );
};

Header.propTypes = {
  currentSource: PropTypes.string.isRequired,
  onShowOptions: PropTypes.func.isRequired,
  onSourceChange: PropTypes.func.isRequired,
  sourcesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;
