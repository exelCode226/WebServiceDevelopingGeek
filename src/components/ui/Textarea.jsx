import { forwardRef } from "react";

export const Textarea = forwardRef((props, ref, rows = 2) => (
  <textarea
    {...props}
    ref={ref}
    className="w-full bg-white text-white px-4 py-2 rounded-md borderTextarea"
    rows={rows}
  />
));
