"use client";

import { Fragment } from "react";
import ParameterLine from "./parameter-line";

export default function Parameters({ items, title }) {
  return (
    <div className="request-box">
      {<h4 className="font-bold">{title || "Parameters (body):"}</h4>}
      <div className="flex flex-col gap-y-4">
        {items &&
          items.length > 0 &&
          items
            .sort((a, b) => (b.required ? 1 : -1))
            .map((line, i) => (
              <Fragment key={i}>
                <ParameterLine {...line} />
              </Fragment>
            ))}
      </div>
    </div>
  );
}
