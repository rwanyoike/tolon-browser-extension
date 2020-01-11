import React from "react";
import PropTypes from "prop-types";

const Options = (props) => {
  const { onOptionsChange, options } = props;

  return (
    <>
      <label className="setting" htmlFor="dark-mode">
        <div>
          <div>Dark Mode:</div>
          <small>
            An alternative color scheme with a dark background and lighter text
          </small>
        </div>
        <input
          checked={options.darkMode}
          id="dark-mode"
          onChange={(event) =>
            onOptionsChange("darkMode", event.target.checked)
          }
          type="checkbox"
        />
      </label>
      <hr />
      <div className="setting">
        <span>
          Icon by{" "}
          <a
            href="https://thenounproject.com/asierbilbo"
            rel="noopener noreferrer"
            target="_blank"
          >
            Asier Bilbo
          </a>{" "}
          from{" "}
          <a
            href="https://thenounproject.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            The Noun Project
          </a>
        </span>
      </div>
      <div className="setting">
        <a
          href="https://github.com/rwanyoike/tolon"
          rel="noopener noreferrer"
          target="_blank"
        >
          Source Code
        </a>
      </div>
    </>
  );
};

Options.propTypes = {
  onOptionsChange: PropTypes.func.isRequired,
  options: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Options;
