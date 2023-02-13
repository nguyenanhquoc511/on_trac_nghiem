import { Modal, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Form } from 'antd';

import BasicLayout from '../../../components/Layouts/BasicLayout';
import TestListModal from './TestListModal';
import { DELETE_TEST } from '../../../api/getTestsAndQuestions';

import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { getTestQuery } from '../../../api/getTestsAndQuestions';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../../context/auth_context';
import Search from 'antd/lib/input/Search';

const TestListPage = () => {
  const [testListData, setTestListData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [totalPage, setTotalPage] = useState('');
  const [page, setPage] = useState(1);
  const [testQuery, setTestQuery] = useState('');
  const { role } = useAuthContext();
  const history = useHistory();

  if (role !== 'admin') {
    history.push('/');
  }

  const resetEditing = () => {
    setIsEditing(false);
    setEditingTest(null);
  };

  const onEditTest = (record) => {
    setIsEditing(true);
    setEditingTest(record);
  };

  useEffect(() => {
    getTestQuery(testQuery, page).then((response) => {
      const { tests, testCount } = response.data;
      setTestListData(tests);
      setTotalPage(testCount);
    });
    const fetchTestQueryData = async () => {
      const response = await getTestQuery(testQuery, page);
      const resTests = response.data.tests;
      setTestListData(resTests);
    };
    if (testQuery.length >= 2) {
      fetchTestQueryData();
    }
  }, [testQuery, page]);

  const onDeleteTest = (record) => {
    Modal.confirm({
      title: 'Do you want to delete this question?',
      okType: 'danger',
      onOk: async () => {
        try {
          const response = await axios.delete(DELETE_TEST + record._id);
          const data = response.data;
          console.log(data);
          setTestListData((pre) => {
            return pre.filter((question) => question._id !== record._id);
          });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
  const testListColumns = [
    {
      key: '1',
      title: 'Category',
      width: 80,
      render: (record) => <div>{mapCategory(record.category)}</div>
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
              setTestQuery(e.target.value);
            }}></Search>
        );
      },
      filterIcon: () => {
        return <SearchOutlined style={{ fontSize: '20px', color: '#000' }} />;
      }
    },
    {
      key: '3',
      title: 'Description',
      dataIndex: 'description',
      width: 300
    },
    {
      key: '4',
      title: 'Actions',
      width: 100,
      render: (record) => {
        return (
          <div style={{ fontSize: '1.2rem' }}>
            <EditOutlined
              onClick={() => {
                onEditTest(record);
                console.log(record);
              }}
              style={{ fontSize: '15px' }}
            />
            <DeleteOutlined
              onClick={() => {
                console.log(record);
                onDeleteTest(record);
              }}
              style={{ color: '#f55257', marginLeft: '1rem', fontSize: '15px' }}
            />
          </div>
        );
      }
    }
  ];

  const mapCategory = (category) => {
    switch (category) {
      case '63329f65623618c133554833':
        return 'Listening';
      case '63329f38623618c13355482f':
        return 'Reading';
      default:
        break;
    }
  };

  return (
    <BasicLayout>
      <Table
        style={{ width: '100%', position: 'relative' }}
        columns={testListColumns}
        dataSource={testListData}
        rowKey="_id"
        pagination={{
          showSizeChanger: false,
          showQuickJumper: true,
          total: totalPage,
          current: page,
          onChange: (page) => setPage(page)
        }}></Table>
      {isEditing && (
        <TestListModal
          resetEditing={resetEditing}
          setEditingTest={setEditingTest}
          editingTest={editingTest}
          setTestListData={setTestListData}
        />
      )}
    </BasicLayout>
  );
};

export default TestListPage;
