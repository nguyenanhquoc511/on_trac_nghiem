import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
const Sections = ({ editingTest, setEditingTest }) => {
  return (
    <div>
      <h3 style={{ marginTop: '1rem' }}>Content</h3>

      <TextArea
        placeholder="Section 1"
        value={editingTest.content[0]}
        onChange={(e) => {
          setEditingTest((pre) => {
            let data = { ...pre };
            data.content[0] = e.target.value;
            return data;
          });
        }}
      />
      <TextArea
        style={{ marginTop: '1rem' }}
        placeholder="Section 2"
        value={editingTest.content[1]}
        onChange={(e) => {
          setEditingTest((pre) => {
            let data = { ...pre };
            data.content[1] = e.target.value;
            return data;
          });
        }}
      />
      <TextArea
        style={{ marginTop: '1rem' }}
        placeholder="Section 3"
        value={editingTest.content[2]}
        onChange={(e) => {
          setEditingTest((pre) => {
            let data = { ...pre };
            data.content[2] = e.target.value;
            return data;
          });
        }}
      />
      <TextArea
        style={{ marginTop: '1rem' }}
        placeholder="Section 4"
        value={editingTest.content[3]}
        onChange={(e) => {
          setEditingTest((pre) => {
            let data = { ...pre };
            data.content[3] = e.target.value;
            return data;
          });
        }}
      />
    </div>
  );
};

export default Sections;
