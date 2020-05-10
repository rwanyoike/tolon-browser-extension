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
          {browser.runtime.getManifest().name} v
          {browser.runtime.getManifest().version}
        </span>
        <a
          href={browser.runtime.getManifest().homepage_url}
          rel="noopener noreferrer"
          target="_blank"
        >
          Source Code (MIT)
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
