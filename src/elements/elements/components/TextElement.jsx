import React from "react";
import { TextEditor } from "../../../_components/Formik/Editor";

function TextElement({row}){
return <TextEditor value={row.text} disabled={true} />
}

export { TextElement }