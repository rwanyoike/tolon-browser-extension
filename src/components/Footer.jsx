import React from "react";
import PropTypes from "prop-types";

const Footer = (props) => {
  const { hits, onIndexChange, pageCount, pageIndex } = props;

  return (
    <>
      <div className="pager">
        <div>
          <button
            disabled={pageIndex <= 0}
            onClick={() => onIndexChange(-1)}
            type="button"
          >
            Previous
          </button>
        </div>
        <div>
          <button
            disabled={pageIndex + 1 >= pageCount}
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
  hits: PropTypes.string.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
};

export default Footer;
