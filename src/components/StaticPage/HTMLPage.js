import React, { useState, useEffect } from "react";
import staticHtml from "./HTMLPage.html";

const HTMLPage = () => {
  return <div dangerouslySetInnerHTML={{ __html: staticHtml }} />;
};

export default HTMLPage;
