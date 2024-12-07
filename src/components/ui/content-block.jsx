"use client";

import CopyElement from "./copy-element";
import Parameters from "./parameters";
import Responses from "./responses";

export default function ContentBlock(props) {
  const defaultClassname = "mb-6";

  return (
    <>
      {props.endpoint ? (
        <div className={defaultClassname}>
          <CopyElement element={props.endpoint} />
        </div>
      ) : null}
      {props.description ? (
        <div className={defaultClassname}>
          <b className="block">Description:</b>
          <span>{props.description}</span>
        </div>
      ) : null}
      {props.parameters && props.parameters.length > 0 ? (
        <div className={defaultClassname}>
          <Parameters items={props.parameters || []} />
        </div>
      ) : null}
      {props.responses && props.responses.length > 0 ? (
        <div className={defaultClassname}>
          <Responses items={props.responses || []} />
        </div>
      ) : null}
    </>
  );
}
