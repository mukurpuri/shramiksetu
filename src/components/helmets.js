
import React from "react";
import { Helmet } from 'react-helmet';
function Helmets(props) {
  return (
    <div className="theme-builder-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <link rel="canonical" href={props.link} />
      </Helmet>
    </div>
  );
}

export default Helmets;
