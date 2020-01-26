import React from "react";
import PropTypes from "prop-types";

const Footer = (props) => {
  const { onIndexChange, count, hits, index } = props;

  return (
    <>
      <div className="pager">
        <div>
          <button
            disabled={index <= 0}
            onClick={() => onIndexChange(-1)}
            type="button"
          >
            Previous
          </button>
        </div>
        <div>
          <button
            disabled={index + 1 >= count}
            onClick={() => onIndexChange(+1)}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
      <div className="hits">{hits}</div>
    </>
  );
};

Footer.propTypes = {
  onIndexChange: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  hits: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Footer;
