import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Input, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../../context/auth_context';

import BasicLayout from '../../../components/Layouts/BasicLayout';
import { getQuestionQuery, DELETE_QUESTION } from '../../../api/getTestsAndQuestions';
import './QuestionList.css';
import Search from 'antd/lib/input/Search';
import QuestionListModal from './QuestionListModal';

const QuestionList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [totalPage, setTotalPage] = useState('');
  const [page, setPage] = useState(1);
  const [questionQuery, setQuestionQuery] = useState('');
  const { role } = useAuthContext();
  const history = useHistory();

  if (role !== 'admin') {
    history.push('/');
  }

  const resetEditing = () => {
    setIsEditing(false);
    setEditingQuestion(null);
  };

  const onEditQuestion = (record) => {
    setIsEditing(true);
    setEditingQuestion(record);
  };

  useEffect(() => {
    getQuestionQuery(questionQuery, page).then((response) => {
      const { questions, questionCount } = response.data;
      setDataSource(questions);
      setTotalPage(questionCount);
    });
    const fetchQuestionQueryData = async () => {
      const response = await getQuestionQuery(questionQuery, page);
      const resQuestions = response.data.questions;
      setDataSource(resQuestions);
    };
    if (questionQuery.length >= 2) {
      fetchQuestionQueryData();
    }
  }, [questionQuery, page]);

  const onDeleteQuestion = (record) => {
    Modal.confirm({
      title: 'Do you want to delete this question?',
      okType: 'danger',
      onOk: async () => {
        try {
          const response = await axios.delete(DELETE_QUESTION + record._id);
          const data = response.data;
          console.log(data);
          setDataSource((pre) => {
            return pre.filter((question) => question._id !== record._id);
          });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const columns = [
    {
      key: '1',
      title: 'Type',
      width: 100,
      render: (record) => <div>{mapType(record.type)}</div>
    },
    {
      key: '2',
      title: 'Title',
      dataIndex: 'title',
      width: 300,
      filterDropdown: () => {
        return (
          <Search
            style={{ width: '400px' }}
            autoFocus={true}
            placeholder="Press Enter to search..."
            onPressEnter={(e) => {
              setQuestionQuery(e.target.value);
            }}></Search>
        );
      },
      filterIcon: () => {
        return <SearchOutlined style={{ fontSize: '20px', color: '#000' }} />;
      }
    },
    {
      key: '3',
      title: 'Content',
      render: (record) => {
        if (record.type === 'fillblank') {
          return (
            <div>
              {record.content[0]}______{record.content[1]}
            </div>
          );
        } else {
          return <div>{record.content[0]}</div>;
        }
      }
    },
    {
      key: '4',
      title: 'Answer',
      dataIndex: 'trueAnswer'
    },
    {
      key: '5',
      title: 'Actions',
      width: 100,
      render: (record) => {
        return (
          <div style={{ fontSize: '1.2rem' }}>
            <EditOutlined
              onClick={() => {
                onEditQuestion(record);
                console.log(record);
              }}
              style={{ fontSize: '20px' }}
            />
            <DeleteOutlined
              onClick={() => onDeleteQuestion(record)}
              style={{ color: '#f55257', marginLeft: '1rem', fontSize: '20px' }}
            />
          </div>
        );
      }
    }
  ];

  const mapType = (type) => {
    switch (type) {
      case 'fillblank':
        return 'Fill Blank';
      case 'multiplechoice':
        return 'Multiple Choice';
      case 'tfn':
        return 'True Fall NotGiven';
      default:
        break;
    }
  };

  return (
    <BasicLayout>
      <Table
        style={{ width: '100%', position: 'relative' }}
        columns={columns}
        dataSource={dataSource}
        rowKey={'_id'}
        pagination={{
          showSizeChanger: false,
          showQuickJumper: true,
          total: totalPage,
          current: page,
          onChange: (page) => setPage(page)
        }}></Table>

      {isEditing && (
        <QuestionListModal
          resetEditing={resetEditing}
          setDataSource={setDataSource}
          editingQuestion={editingQuestion}
          setEditingQuestion={setEditingQuestion}
        />
      )}
    </BasicLayout>
  );
};

export default QuestionList;
