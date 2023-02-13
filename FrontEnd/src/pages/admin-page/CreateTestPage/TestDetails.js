import React, { useContext, useEffect, useState } from 'react';
import { Form, Select, Input, Button, Table, notification, Upload, message } from 'antd';
import { SmileOutlined, MinusCircleTwoTone } from '@ant-design/icons';
// import TestDetailsUpload from './TestDetailsUpload';
import axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;

const TestDetails = ({
  data,
  setDataDetail,
  questionIds,
  setDataSource,
  dataSource,
  initialDataSource
}) => {
  const [isReading, setIsReading] = useState(true);
  const [form] = Form.useForm();

  const testDetailColumns = [
    {
      key: '1',
      title: 'Title',
      dataIndex: 'title',
      width: 300
    },
    {
      key: '2',
      title: 'Actions',
      width: 100,
      render: (record) => {
        return (
          <div style={{ fontSize: '1.2rem' }}>
            <MinusCircleTwoTone
              onClick={() => {
                setDataDetail(data.filter((value) => value._id !== record._id));

                const temp = [...dataSource];
                temp.push(record);
                setDataSource(temp);
              }}
              style={{ color: '#337ab7', marginLeft: '1rem', fontSize: '20px' }}
            />
          </div>
        );
      }
    }
  ];

  const onAddTest = (values) => {
    const sendTestData = async () => {
      try {
        const formData = new FormData();
        formData.append('image', values.image.file);
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('content', [
          values.section1,
          values.section2,
          values.section3,
          values.section4
        ]);
        formData.append('category', values.category);
        questionIds.forEach((data) => {
          formData.append('questions[]', data);
        });
        formData.append('video', values.video);
        const response = await axios.post(`http://localhost:3000/api/tests/create`, formData);
        const data = response.data;
      } catch (error) {
        console.error(error);
      }
    };
    sendTestData();
    console.log(values);
    setDataDetail([]);
    setDataSource(initialDataSource);
    form.resetFields(['description', 'title', 'section1', 'image']);

    notification.open({
      message: 'Success',
      description: 'Đã thêm thành công',
      icon: <SmileOutlined style={{ color: '#56d364' }} />
    });
  };

  const onAddTestFail = () => {};

  return (
    <Form
      style={{ width: '90%', position: 'relative' }}
      layout="horizontal"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      onFinish={onAddTest}
      onFinishFailed={onAddTestFail}
      form={form}>
      <Form.Item
        style={{ width: '200px' }}
        name="category"
        initialValue={'63329f38623618c13355482f'}>
        <Select
          onChange={() => {
            setIsReading(!isReading);
          }}>
          <Option value="63329f38623618c13355482f">Reading</Option>
          <Option value="63329f65623618c133554833">Listening</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="title"
        label="Title"
        labelAlign="left"
        rules={[
          {
            required: true,
            message: 'This field must be filled'
          },
          { whitespace: true }
        ]}>
        <Input.TextArea placeholder="Insert a title" allowClear autoFocus={true} />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        labelAlign="left"
        rules={[
          {
            required: true,
            message: 'This field must be filled'
          },
          { whitespace: true },
          { min: 80, message: 'Description must be at least 10 characters' }
        ]}
        hasFeedback>
        <Input.TextArea placeholder="Description" />
      </Form.Item>

      {isReading ? (
        <Form.Item
          name="section1"
          label="Content"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: 'This field must be filled'
            },
            { whitespace: true },
            { min: 10, message: 'Content must be at least 10 characters' }
          ]}
          hasFeedback>
          <Input.TextArea placeholder="Content" />
        </Form.Item>
      ) : (
        <>
          <Form.Item
            name="video"
            label="Audio"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: 'This field must be filled'
              },
              { whitespace: true },
              { min: 10, message: 'Content must be at least 10 characters' }
            ]}
            hasFeedback>
            <Input placeholder="Audio" />
          </Form.Item>

          <Form.Item
            name="section1"
            label="Section 1"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: 'This field must be filled'
              },
              { whitespace: true },
              { min: 10, message: 'Section 1 must be at least 10 characters' }
            ]}
            hasFeedback>
            <TextArea placeholder="Section 1" />
          </Form.Item>

          <Form.Item
            name="section2"
            label="Section 2"
            labelAlign="left"
            rules={[
              {
                message: 'This field must be filled'
              },
              { whitespace: true },
              { min: 10, message: 'Section 2 must be at least 10 characters' }
            ]}
            hasFeedback>
            <TextArea placeholder="Section 2" />
          </Form.Item>

          <Form.Item
            name="section3"
            label="Section 3"
            labelAlign="left"
            rules={[
              {
                message: 'This field must be filled'
              },
              { whitespace: true },
              { min: 10, message: 'Section 3 must be at least 10 characters' }
            ]}
            hasFeedback>
            <TextArea placeholder="Section 3" />
          </Form.Item>

          <Form.Item
            name="section4"
            label="Section 4"
            labelAlign="left"
            rules={[
              {
                message: 'This field must be filled'
              },
              { whitespace: true },
              { min: 10, message: 'Section 4 must be at least 10 characters' }
            ]}
            hasFeedback>
            <TextArea placeholder="Section 4" />
          </Form.Item>
        </>
      )}
      <Form.Item name="image" label="Image" labelAlign="left">
        <Upload
          maxCount={1}
          listType="picture"
          accept=".png,.jpeg"
          beforeUpload={() => {
            return false;
          }}>
          <Button>Select File</Button>
        </Upload>
      </Form.Item>
      <Form.Item style={{ marginTop: '2rem' }} wrapperCol={24}>
        <Table
          style={{ width: '100%' }}
          dataSource={data}
          columns={testDetailColumns}
          rowKey={'_id'}></Table>
      </Form.Item>
      <Button htmlType="submit" style={{ position: 'absolute', right: '0' }}>
        Submit
      </Button>
    </Form>
  );
};

export default TestDetails;
