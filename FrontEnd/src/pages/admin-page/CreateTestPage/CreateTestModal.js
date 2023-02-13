import React, { useState } from 'react';
import { Input, Select, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { EDIT_QUESTION } from '../../../api/getTestsAndQuestions';
import axios from 'axios';
const { Option } = Select;

const CreateTestModal = ({
  resetEditing,
  setDataSource,
  editingQuestion,
  setEditingQuestion
}) => {
  const [isFillBlankModal, setIsFillBlankModal] = useState(true);

  const handleChangeFillBlankModal = () => {
    setIsFillBlankModal(!isFillBlankModal);
  };

  return (
    <Modal
      title="Edit Question"
      okText="Save"
      visible
      width={1000}
      onCancel={() => {
        resetEditing();
      }}
      onOk={() => {
        setDataSource((pre) => {
          return pre.map((question) => {
            if (question._id === editingQuestion._id) {
              const updateData = async () => {
                try {
                  const response = await axios.put(EDIT_QUESTION + editingQuestion._id, {
                    title: editingQuestion.title,
                    content: editingQuestion.content,
                    type: editingQuestion.type.toLowerCase().replace(/\s/g, ''),
                    answer: editingQuestion.answer,
                    trueAnswer: editingQuestion.trueAnswer
                  });
                  const data = response.data;
                  console.log(data);
                } catch (error) {   
                  console.error(error);
                }
              };
              updateData();
              console.log(editingQuestion);
              return editingQuestion;
            } else {
              return question;
            }
          });
        });
        resetEditing();
      }}
      className="edit-modal">
      <h3>Type</h3>
      <Select
        defaultValue={editingQuestion.type === 'fillblank' ? 'Fill Blank' : 'Multiple Choice'}
        onChange={handleChangeFillBlankModal}
        style={{ minWidth: '140px' }}
        disabled>
        <Option value="Fill Blank">Fill Blank</Option>
        <Option value="Multiple Choice">Multiple Choice</Option>
      </Select>

      <h3 style={{ marginTop: '1rem' }}>Question</h3>
      <TextArea
        placeholder="Question"
        value={editingQuestion.content[0]}
        onChange={(e) => {
          setEditingQuestion((pre) => {
            let temp = { ...pre };
            temp.content[0] = e.target.value;
            return temp;
          });
        }}
      />

      {editingQuestion.type === 'fillblank' ? (
        <div>
          <h3 style={{ marginTop: '1rem' }}>Question_2</h3>
          <TextArea
            placeholder="Question_2"
            value={editingQuestion.content[1]}
            onChange={(e) => {
              setEditingQuestion((pre) => {
                let temp = { ...pre };
                temp.content[1] = e.target.value;
                return temp;
              });
            }}
          />
        </div>
      ) : (
        <div>
          <h3 style={{ marginTop: '1rem' }}> Options </h3>
          <Input
            addonBefore={'A'}
            style={{ marginTop: '1rem' }}
            value={editingQuestion.answer[0]}
            onChange={(e) => {
              setEditingQuestion((pre) => {
                let temp = { ...pre };
                temp.answer[0] = e.target.value;
                return temp;
              });
            }}
          />
          <Input
            addonBefore={'B'}
            style={{ marginTop: '1rem' }}
            value={editingQuestion.answer[1]}
            onChange={(e) => {
              setEditingQuestion((pre) => {
                let temp = { ...pre };
                temp.answer[1] = e.target.value;
                return temp;
              });
            }}
          />
          <Input
            addonBefore={'C'}
            style={{ marginTop: '1rem' }}
            value={editingQuestion.answer[2]}
            onChange={(e) => {
              setEditingQuestion((pre) => {
                let temp = { ...pre };
                temp.answer[2] = e.target.value;
                return temp;
              });
            }}
          />
          <Input
            addonBefore={'D'}
            style={{ marginTop: '1rem' }}
            value={editingQuestion.answer[3]}
            onChange={(e) => {
              setEditingQuestion((pre) => {
                let temp = { ...pre };
                temp.answer[3] = e.target.value;
                return temp;
              });
            }}
          />
        </div>
      )}
      <h3 style={{ marginTop: '1rem' }}>Answer</h3>
      <TextArea
        placeholder="Answer"
        value={editingQuestion.trueAnswer}
        onChange={(e) => {
          setEditingQuestion((pre) => {
            return { ...pre, trueAnswer: e.target.value };
          });
        }}
      />
      <h3 style={{ marginTop: '1rem' }}>Title</h3>
      <TextArea
        placeholder="Title"
        value={editingQuestion.title}
        onChange={(e) => {
          setEditingQuestion((pre) => {
            return { ...pre, title: e.target.value };
          });
        }}
      />
    </Modal>
  );
};

export default CreateTestModal;
