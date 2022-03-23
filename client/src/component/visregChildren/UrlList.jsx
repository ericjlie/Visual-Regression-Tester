import React, { useState } from 'react';
import UrlSubList from './UrlSubList.jsx';
import UrlForm from './UrlForm.jsx';

const UrlList = ({urls, setUrls, setTestSelect, report, setSelectReport}) => {
  return (
    <div className="urlForm">
      <h1>URLs to Test</h1>
      <UrlForm
      setUrls={setUrls}
      urls={urls}
      />
      {Object.keys(urls).map((url,i) => <UrlSubList url={urls[url]} setSelectReport={setSelectReport} key={i} setTestSelect={setTestSelect} report={report[url] ? report[url] : null}/>)}
    </div>
  )
};

export default UrlList;