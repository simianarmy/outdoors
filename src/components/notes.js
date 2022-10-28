import React from "react";
import { RichText } from "prismic-reactjs";

export default function Notes({richText}) {
  const [hidden, setHidden] = React.useState(true);

  return (
    <div className="notes">
      {hidden ? (<button onClick={() => setHidden(false)}>Notes</button>) :
      <div className="pattern">
        <div className="content">
          <RichText render={richText.raw} />
        </div>
      </div>
      }
    </div>
  );
};
