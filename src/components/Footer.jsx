import React from "react";
import PropTypes from "prop-types";

const Footer = (props) => {
  const { onIndexChange, pageCount, pageIndex } = props;

  return (
    <>
      <div>
        <button
          disabled={pageIndex <= 0}
          onClick={() => onIndexChange(-1)}
          type="button"
        >
          Previous
        </button>
        <button
          disabled={pageIndex + 1 >= pageCount}
          onClick={() => onIndexChange(+1)}
          type="button"
        >
          Next
        </button>
      </div>
      <div>
        <a
          href="https://github.com/rwanyoike/tolon"
          rel="noopener noreferrer"
          target="_blank"
        >
          [ ? ]
        </a>
      </div>
    </>
  );
};

Footer.propTypes = {
  onIndexChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
};

export default Footer;
