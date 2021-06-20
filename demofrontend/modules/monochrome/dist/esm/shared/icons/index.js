import React from 'react';

function makeIcon(path) {
  return function IconComponent() {
    return React.createElement("svg", {
      width: "100%",
      viewBox: "0 0 24 24"
    }, React.createElement("path", {
      d: path
    }));
  };
}

export var CollapsedIcon = makeIcon('M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z');
export var ExpandedIcon = makeIcon('M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z');
export var PlayIcon = makeIcon('M8 5v14l11-7z');
export var PauseIcon = makeIcon('M6 19h4V5H6v14zm8-14v14h4V5h-4z');
export var CheckIcon = makeIcon('M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z');
export var CheckAltIcon = makeIcon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z');
export var IndeterminateIcon = makeIcon('M19 13H5v-2h14v2z');
export var AscendingIcon = makeIcon('M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z');
export var DescendingIcon = makeIcon('M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z');
export var DropdownIcon = makeIcon('M7 10l5 5 5-5z');
export var ClearIcon = makeIcon('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z');
export var InfoIcon = makeIcon('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z');
//# sourceMappingURL=index.js.map