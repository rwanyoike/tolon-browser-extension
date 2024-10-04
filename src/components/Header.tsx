import type * as ty from "../types";
import * as css from "./Header.css";

export interface HeaderProps {
  /** Current source */
  currentSource: ty.Source;
  /** Source change handler */
  onSourceChange: (source: ty.Source) => void;
  /** List of sources */
  sources: ty.Source[];
}

export const Header = (props: HeaderProps) => {
  return (
    <header className={css.container}>
      <nav className={css.inner}>
        {props.sources.map((source) => (
          <button
            key={source.name}
            className={
              props.currentSource === source ? css.buttonActive : css.button
            }
            type="button"
            onClick={() => props.onSourceChange(source)}
            data-testid="site-button"
          >
            {source.name}
          </button>
        ))}
      </nav>
      <div className={css.inner} />
    </header>
  );
};
