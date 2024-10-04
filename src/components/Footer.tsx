import * as css from "./Footer.css";

export interface FooterProps {
  /** Current page index */
  currentIndex: number;
  /** Index change handler */
  onIndexChange: (add: number) => void;
  /** Total page count */
  pageCount: number;
  /** Total search hits */
  searchHits: string;
}

export const Footer = (props: FooterProps) => {
  return (
    <footer className={css.container}>
      <div className={css.inner}>
        <button
          className={css.button}
          type="button"
          onClick={() => props.onIndexChange(-1)}
          disabled={props.currentIndex <= 0}
          data-testid="prev-button"
        >
          Previous
        </button>
        <button
          className={css.button}
          type="button"
          onClick={() => props.onIndexChange(+1)}
          disabled={props.currentIndex + 1 >= props.pageCount}
          data-testid="next-button"
        >
          Next
        </button>
      </div>
      <div className={css.inner}>
        <button className={css.button} type="button" data-testid="hits-button">
          {props.searchHits}
        </button>
      </div>
    </footer>
  );
};
