import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import UrlForm from './visregChildren/UrlForm.jsx';
import UrlList from './visregChildren/UrlList.jsx';
import Test from './visregChildren/Test.jsx';

const Visreg = () => {
  const [urls, setUrls] = useState({});
  const [serverState, setServerState] = useState('rest');
  const [reportTime, setReportTime] = useState(null);
  const [testSelect, setTestSelect] = useState(null);
  const [testTimeStamp, setTestTimeStamp] = useState(null);
  const [report, setReport] = useState(null);

  const createReference = async () => {
    setServerState('Referencing');
    Object.keys(urls).forEach( async (site) => {
      const domain = (new URL(site)).hostname.replace('www.', '');
      const bodyUrls = urls[site].map((subUrl, i) => {
        return {
          label: domain + [i],
          url: subUrl
        }
      })
      console.log(bodyUrls);
      axios.post('/reference', {
        urls: bodyUrls,
        testName: domain
      }).then(()=>{setServerState('rest')})
    });
  }
  const runTest = async () => {
    setServerState('Testing');
    Object.keys(urls).forEach( async (site) => {
      const domain = (new URL(site)).hostname.replace('www.', '');
      const bodyUrls = urls[site].map((subUrl, i) => {
        return {
          label: domain + [i],
          url: subUrl
        }
      })
      console.log(bodyUrls);
      axios.post('/test', {
        urls: bodyUrls,
        testName: domain
      }).then(()=>{
        setServerState('rest');

      })
    });
  }
  return (
    <div>
      <UrlForm
      setUrls={setUrls}
      urls={urls}
      />
      <UrlList
      setUrls={setUrls}
      urls={urls}
      setTestSelect={setTestSelect}
      />
    {Object.keys(urls).length > 0 ? (
      serverState === 'rest' ?
      <div>
        <button onClick={createReference}>Create New References</button>
        <button onClick={runTest}>Run Test</button>
      </div>
      :
      <div>Server is {serverState}...</div>

    )
     : <div></div>}
    {testSelect ? <Test testSelect={testSelect}/> : <div></div>}
    </div>
  )

};

export default Visreg;