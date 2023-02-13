import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { FileAddOutlined, SmileOutlined, FrownOutlined } from '@ant-design/icons';
import BasicLayout from '../../../components/Layouts/BasicLayout';
import styled from 'styled-components';
import { useAuthContext } from '../../../context/auth_context';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;

const CreateQuestionPage = () => {
  const { role } = useAuthContext();
  const history = useHistory();

  if (role !== 'admin') {
    history.push('/');
  }

  const [isFillBlank, setIsFillBlank] = useState(true);
  const [form] = Form.useForm();

  const handleChangeFillBlank = (value) => {
    if (value === 'Multiple Choice') {
      setIsFillBlank(false);
    } else {
      setIsFillBlank(true);
    }
    // setIsFillBlank(!isFillBlank);
  };

  const onAddQuestion = (values) => {
    console.log(values);
    const sendData = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/api/questions/create`, {
          key: values._id,
          title: values.title,
          content: [values.content, values.content_2],
          type: values.type.toLowerCase().replace(/\s/g, ''),
          answer: [values.optionA, values.optionB, values.optionC, values.optionD],
          trueAnswer: values.trueAnswer,
          description: values.description,
          explaination: values.explaination
        });
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    sendData();
    form.resetFields([
      'content',
      'content_2',
      'title',
      'optionA',
      'optionB',
      'optionC',
      'optionD',
      'trueAnswer',
      'description',
      'explaination'
    ]);
    notification.open({
      message: 'Success',
      description: 'Đã thêm thành công',
      icon: <SmileOutlined style={{ color: '#56d364' }} />
    });
  };

  const onAddFailed = (error) => {
    const errFields = error.errorFields;
    console.log(error);
    form.resetFields(errFields.map((errField) => errField.name));
    notification.open({
      message: 'Fail',
      description: 'Câu hỏi nhập vào không hợp lệ, vui lòng kiểm tra lại.',
      icon: <FrownOutlined style={{ color: '#d92736' }} />
    });
  };

  return (
    <BasicLayout>
      <CreateQuestionWrapper>
        <Form
          layout="horizontal"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 19 }}
          onFinish={onAddQuestion}
          onFinishFailed={onAddFailed}
          form={form}>
          <Form.Item name="type" label="Type" initialValue={'Fill Blank'}>
            <Select onChange={handleChangeFillBlank}>
              <Option value="Fill Blank">Fill Blank</Option>
              <Option value="Multiple Choice">Multiple Choice</Option>
              <Option value="TFN">TFN</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'This field must be filled'
              },
              { whitespace: true },
              { min: 10, message: 'Title must be at least 10 characters' }
            ]}
            hasFeedback>
            <TextArea placeholder="Title" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Question"
            rules={[
              {
                required: true,
                message: 'This field must be filled'
              },
              { whitespace: true },
              { min: 1, message: 'Question must be at least 10 characters' }
            ]}
            hasFeedback>
            <TextArea placeholder="Question" />
          </Form.Item>

          {isFillBlank ? (
            <Form.Item
              name="content_2"
              label="Question_2"
              rules={[
                {
                  message: 'This field must be filled'
                },
                { whitespace: true },
                { min: 10, message: 'Question_2 must be at least 10 characters' }
              ]}
              hasFeedback>
              <TextArea placeholder="Question_2" />
            </Form.Item>
          ) : (
            <div>
              <Form.Item
                name="optionA"
                label="Option A"
                rules={[
                  {
                    message: 'This field must be filled'
                  },
                  { whitespace: true }
                ]}
                hasFeedback>
                <TextArea />
              </Form.Item>
              <Form.Item
                name="optionB"
                label="Option B"
                rules={[
                  {
                    message: 'This field must be filled'
                  },
                  { whitespace: true }
                ]}
                hasFeedback>
                <TextArea />
              </Form.Item>
              <Form.Item
                name="optionC"
                label="Option C"
                rules={[
                  {
                    message: 'This field must be filled'
                  },
                  { whitespace: true }
                ]}
                hasFeedback>
                <TextArea />
              </Form.Item>
              <Form.Item
                name="optionD"
                label="Option D"
                rules={[
                  {
                    message: 'This field must be filled'
                  },
                  { whitespace: true }
                ]}
                hasFeedback>
                <TextArea />
              </Form.Item>
            </div>
          )}

          <Form.Item
            name="trueAnswer"
            label="Answer"
            rules={[
              {
                required: true,
                message: 'This field must be filled'
              },
              { whitespace: true },
              { min: 1, message: 'Answer must be at least 1 characters' }
            ]}
            hasFeedback>
            <TextArea placeholder="Answer" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { whitespace: true },
              { min: 1, message: 'Description must be at least 1 characters' }
            ]}
            hasFeedback>
            <TextArea placeholder="Answer" />
          </Form.Item>

          <Form.Item
            name="explaination"
            label="Explaination"
            rules={[
              {
                required: true,
                message: 'This field must be filled'
              },
              { whitespace: true },
              { min: 1, message: 'Explaination must be at least 1 characters' }
            ]}
            hasFeedback>
            <TextArea placeholder="Explaination" />
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 24 }}
            style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button htmlType="submit" className="new-test-btn">
              <FileAddOutlined />
              Create new question
            </Button>
          </Form.Item>
        </Form>
      </CreateQuestionWrapper>
    </BasicLayout>
  );
};
export default CreateQuestionPage;

const CreateQuestionWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  .new-test-btn {
    margin: 1rem 0;
    margin-right: 9rem;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    border-radius: 3px;
    border: 0;
    color: #fff;
    background: #4c1d95;
    font-size: 16px;
    :hover {
      transition: all 0.1s ease;
      box-shadow: 0 0 0 0 #fff, 0 0 0 3px #8b5cf6;
    }
  }

  .confirm-btn {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .save-btn {
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    border-radius: 3px;
    padding: 12px 24px;
    border: 0;
    color: #fff;
    background: #ff5000;
    line-height: 1.15;
    font-size: 16px;
    :hover {
      transition: all 0.1s ease;
      box-shadow: 0 0 0 0 #fff, 0 0 0 3px #8b5cf6;
    }
  }
  .cancel-btn {
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    border-radius: 3px;
    padding: 12px 24px;
    border: 0;
    color: #3a4149;
    background: #e7ebee;
    line-height: 1.15;
    font-size: 16px;
    :hover {
      transition: all 0.1s ease;
      box-shadow: 0 0 0 0 #fff, 0 0 0 3px #8b5cf6;
    }
  }
`;
