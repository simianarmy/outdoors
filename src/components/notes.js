import React from "react";
import { RichText } from "prismic-reactjs";

export default function Notes({richText}) {
  const [hidden, setHidden] = React.useState(true);

  return (
    <div className="mt-5 pb-5 notes">
      {hidden ? (<button onClick={() => setHidden(false)}>Notes</button>) :
      <div className="h-full bg-neutral-100 pattern">
        <div className="py-4 px-8 leading-6 text-base tracking-wide content">
          <RichText render={richText.raw} />
        </div>
      </div>
      }
    </div>
  );
};
