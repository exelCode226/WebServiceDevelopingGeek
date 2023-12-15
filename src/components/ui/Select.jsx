import React, { forwardRef } from "react";
export const Select = forwardRef((props, ref) => (
    <select
      {...props}
      ref={ref}
      className="inputCompenent"
    />
  ));
  