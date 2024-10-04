import type { AnchorHTMLAttributes, ReactNode } from "react";

import type * as ty from "../types";
import * as css from "./Body.css";

const Link = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { children, ...rest } = props;
  return (
    <a rel="noopener noreferrer" target="_blank" {...rest}>
      {children}
    </a>
  );
};

/* - If `title` is set, set the `text` title attribute
   - If `url` is set, wrap `text` in an anchor element
   - If `url` is not set, wrap `text` in a span element */
const Meta = (props: {
  item: string;
  text: string;
  title?: string;
  url?: string;
}) => {
  return (
    <div className={`meta__${props.item}`}>
      {props.url ? (
        <Link href={props.url} title={props.title}>
          {props.text}
        </Link>
      ) : (
        <span title={props.title}>{props.text}</span>
      )}
    </div>
  );
};

const Message = (props: { children: ReactNode }) => {
  return (
    <div className={css.message} data-testid="message">
      {props.children}
    </div>
  );
};

const Result = (props: ty.Result) => {
  return (
    <article className={css.result} data-testid="result">
      <div className={css.title} data-testid="result-title">
        <Link href={props.thread.url}>
          <b>{props.thread.title}</b>
        </Link>
      </div>
      <div className={css.url} data-testid="result-url">
        <Link href={props.url} title={props.url}>
          {props.url}
        </Link>
      </div>
      <div className={css.meta} data-testid="result-meta">
        {props.meta.map((meta) => (
          <Meta key={meta.item} {...meta} />
        ))}
      </div>
    </article>
  );
};

export interface BodyProps {
  /** The webpage URL */
  query: string | null;
  /** useEffect error */
  error: Error | null;
  /** Error remove handler */
  onErrorRemove: () => void;
  /** Search results */
  items: ty.Result[] | undefined;
}

export const Body = (props: BodyProps) => {
  return (
    <main className={css.container}>
      {(() => {
        if (!props.query) {
          return (
            <Message>
              <b>Nothing to do on this page:</b> I don't work on special pages
              like this one. Try browsing somewhere else.
            </Message>
          );
        }
        if (props.error) {
          return (
            <Message>
              <b>{props.error.name}:</b> {props.error.message}
              <button
                className={css.button}
                type="button"
                onClick={() => props.onErrorRemove()}
              >
                Retry
              </button>
            </Message>
          );
        }
        if (!props.items) {
          return <Message>Loading...</Message>;
        }
        if (!props.items.length) {
          return (
            <Message>
              <b>Found no threads matching:</b> "{props.query}"
            </Message>
          );
        }
        return props.items.map((result) => (
          <Result key={result.id} {...result} />
        ));
      })()}
    </main>
  );
};
