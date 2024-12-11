import './App.css';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UploadFile from './components/UploadFile';
import Select from 'react-select';

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    borderRadius: '8px',
    borderColor: 'blue',
    padding: '5px 10px',
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? 'blue' : isFocused
      ? 'lightgray' : 'white',
    color: isSelected ? 'white' : 'black',
    cursor: 'pointer',
  }),
};

const options = [
  { value: 'bleu', label: 'BLEU Score' },
  { value: 'ter', label: 'TER Score' },
  { value: 'meteor', label: 'METEOR Score' },
];

const Leaderboard = styled.div`
  display: flex;
  background-color: #777575;
  color: #f9f5f5;
`;

const App = () => {
  const [allModels, setAllModels] = useState([]);
  const [file, setFile] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('bleu');

  useEffect(() => {
    if (!file || file.length === 0) {
      console.log('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAllModels(JSON.parse(reader.result));
      console.log(reader.result)
    };

    reader.readAsText(file);
  }, [file]);

  return (
    <div className="App">
      <header className="App-header">
        <div>Robustness Leaderboard</div>
        <UploadFile onChangeFile={setFile} />
        {Object.keys(allModels).length > 0 && (
          <div>
            <Select
              value={selectedMetric.value}
              onChange={(option) => setSelectedMetric(option.value)}
              options={options}
              styles={customStyles}
            />
            <Leaderboard>
              {selectedMetric === 'bleu' && (
                <table border="1" cellPadding="10">
                  <thead>
                    <tr>
                      <th>Ranking</th>
                      <th>Model Name</th>
                      <th>Original BLEU Score</th>
                      <th>Noisy BLEU Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allModels.result_by_bleu.map((row) => (
                      <tr key={row.bleu_id}>
                        <td>{row.bleu_id}</td>
                        <td>{row.model}</td>
                        <td>{row.original_bleu_score}</td>
                        <td>{row.noisy_bleu_score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {selectedMetric === 'ter' && (
                <table border="1" cellPadding="10">
                  <thead>
                    <tr>
                      <th>Ranking</th>
                      <th>Model Name</th>
                      <th>Original TER Score</th>
                      <th>Noisy TER Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allModels.result_by_ter.map((row) => (
                      <tr key={row.ter_id}>
                        <td>{row.ter_id}</td>
                        <td>{row.model}</td>
                        <td>{row.original_ter_score}</td>
                        <td>{row.noisy_ter_score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {selectedMetric === 'meteor' && (
                <table border="1" cellPadding="10">
                  <thead>
                    <tr>
                      <th>Ranking</th>
                      <th>Model Name</th>
                      <th>Original METEOR Score</th>
                      <th>Noisy METEOR Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allModels.result_by_meteor.map((row) => (
                      <tr key={row.meteor_id}>
                        <td>{row.meteor_id}</td>
                        <td>{row.model}</td>
                        <td>{row.original_meteor_score}</td>
                        <td>{row.noisy_meteor_score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Leaderboard>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
