import React from "react";
import { RichText } from "prismic-reactjs";

export default function Notes({richText}) {
  const [hidden, setHidden] = React.useState(true);

  return (
    <div className="mt-5 pb-5">
      {hidden ? (<button className="underline" onClick={() => setHidden(false)}>Notes</button>) :
      <div className="h-full bg-neutral-100">
        <div className="py-4 px-4 md:px-8 leading-6 text-base tracking-wide content">
          <article className="prose">
            <RichText render={richText.raw} />
          </article>
        </div>
      </div>
      }
    </div>
  );
};
