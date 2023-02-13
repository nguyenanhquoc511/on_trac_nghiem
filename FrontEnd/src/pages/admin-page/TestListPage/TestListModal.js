import React, { useState, useEffect } from 'react';
import { Input, Select, Modal, Table, Upload, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import Sections from './Sections';
import { EDIT_TEST } from '../../../api/getTestsAndQuestions';
const { Option } = Select;

const TestListModal = ({ resetEditing, setEditingTest, editingTest, setTestListData }) => {
  const [image, setImage] = useState();
  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const handlePreviewImage = (e) => {
    const file = e.file;
    file.preview = URL.createObjectURL(file);
    setImage(file);
    setEditingTest((pre) => {
      console.log(pre);
      let data = { ...pre };
      data.image.name = 'http://localhost:3000/' + e.file.name;
      return data;
    });
  };

  const saveTestChanges = () => {
    setTestListData((pre) => {
      return pre.map((test) => {
        if (test._id === editingTest._id) {
          console.log('image', image);
          const updateData = async () => {
            try {
              const formData = new FormData();
              formData.append('category', editingTest.category);
              formData.append('title', editingTest.title);
              formData.append('content', editingTest.content);
              formData.append('description', editingTest.description);
              formData.append('image', image);
              const response = await axios.put(EDIT_TEST + editingTest._id, formData);
              console.log(response);
              const data = response.data;
              console.log(data);
            } catch (error) {
              console.error(error);
            }
          };
          updateData();
          console.log(editingTest);
          return editingTest;
        } else {
          return test;
        }
      });
    });
    resetEditing();
  };

  return (
    <Modal
      title="Edit Test"
      okText="Save"
      visible
      width={1000}
      onCancel={() => {
        resetEditing();
      }}
      onOk={() => {
        saveTestChanges();
      }}>
      <h3>Type</h3>
      <Select
        defaultValue={editingTest.category === '63329f38623618c13355482f' ? 'Reading' : 'Listening'}
        style={{ minWidth: '100px' }}
        disabled>
        <Option value="63329f38623618c13355482f">Reading</Option>
        <Option value="63329f65623618c133554833">Listening</Option>
      </Select>

      <h3 style={{ marginTop: '1rem' }}>Title</h3>
      <TextArea
        placeholder="Title"
        value={editingTest.title}
        onChange={(e) => {
          setEditingTest((pre) => {
            let data = { ...pre };
            data.title = e.target.value;
            return data;
          });
        }}
      />
      {editingTest.category === '63329f38623618c13355482f' ? (
        <div>
          <h3 style={{ marginTop: '1rem' }}>Content</h3>
          <TextArea
            placeholder="Content"
            value={editingTest.content[0]}
            onChange={(e) => {
              setEditingTest((pre) => {
                let data = { ...pre };
                data.content[0] = e.target.value;
                return data;
              });
            }}
          />
        </div>
      ) : (
        <Sections editingTest={editingTest} setEditingTest={setEditingTest} />
      )}

      <h3 style={{ marginTop: '1rem' }}>Description</h3>
      <TextArea
        placeholder="Description"
        value={editingTest.description}
        onChange={(e) => {
          setEditingTest((pre) => {
            let data = { ...pre };
            data.description = e.target.value;
            return data;
          });
        }}
      />

      <h3 style={{ marginTop: '1rem' }}>Image</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <img
          src={image ? image.preview : editingTest.image.name}
          style={{ width: '200px', height: '200px', objectFit: 'contain' }}
        />
        <Upload
          listType="picture"
          maxCount={1}
          accept=".png,.jpeg, .jpg"
          beforeUpload={() => {
            return false;
          }}
          onChange={handlePreviewImage}>
          <Button>Change Image</Button>
        </Upload>
      </div>

      <h3 style={{ marginTop: '1rem' }}>Questions</h3>
      <Table></Table>
    </Modal>
  );
};

export default TestListModal;
