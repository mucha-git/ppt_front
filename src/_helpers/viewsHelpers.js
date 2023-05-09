export const btnTypes = [
    { key: "Tekst", value: "Text" },
    { key: "Tekst z etykietą", value: "GraphicWithText" },
    { key: "Grafika", value: "Graphic" },
  ];

export const contentTypes = [
    { key: "Lista", value: "List" },
    { key: "Treści", value: "Elements" },
    { key: "Link zewnętrzny", value: "ExternalLink" },
  ];

export const setContentType = (row) => {
    if (row.type.includes("External")) return "ExternalLink";
    switch (row.screenType) {
      case "ListScreen":
        return "List";
      case "TextScreen":
        return "Elements";
    }
  };

export const getScreenType = (values) => {
    if (values.contentType.includes("External")) return null;
    switch (values.contentType) {
      case "List":
        return "ListScreen";
      case "Elements":
        return "TextScreen";
    }
  };

export const setBtnType = (type) => {
    return type.includes("Text") ? type.includes("Graphic")? "GraphicWithText" :"Text" : "Graphic";
  }