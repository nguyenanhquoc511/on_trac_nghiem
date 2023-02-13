import React, { useEffect, useState } from 'react';
import { Input, Table } from 'antd';
import { EditFilled, PlusCircleTwoTone } from '@ant-design/icons';
import TestDetails from './TestDetails';
import BasicLayout from '../../../components/Layouts/BasicLayout';
import CreateTestModal from './CreateTestModal';
import { getQuestionQuery } from '../../../api/getTestsAndQuestions';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../../context/auth_context';

const { Search } = Input;

const CreateTestPage = () => {
  const [query, setQuery] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [totalPage, setTotalPage] = useState('');
  const [page, setPage] = useState(1);
  const [dataDetail, setDataDetail] = useState([]);
  const [toggleReset, setToggleReset] = useState(true);
  const [initialDataSource, setInitialDataSource] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const resetEditing = () => {
    setIsEditing(false);
    setEditingQuestion(null);
  };
  const onEditQuestion = (record) => {
    setIsEditing(true);
    setEditingQuestion(record);
  };

  const questionIds = dataDetail.map((data) => data._id);
  const history = useHistory();
  const { role } = useAuthContext();

  if (role !== 'admin') {
    history.push('/');
  }

  console.log(dataSource, dataDetail);

  const CreateTestDetailTableData = [
    {
      key: '1',
      title: 'Title',
      dataIndex: 'title',
      width: 100
    },
    {
      key: '2',
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
      },
      width: 300
    },
    {
      key: '2',
      title: 'Actions',
      width: 100,
      render: (record) => {
        return (
          <div style={{ fontSize: '1.2rem' }}>
            <PlusCircleTwoTone
              onClick={() => {
                setDataSource(dataSource.filter((value) => value._id !== record._id));
                const temp = [...dataDetail];
                temp.push(record);
                setDataDetail(temp);
              }}
              style={{ color: '#337ab7', fontSize: '20px' }}
            />
            <EditFilled
              onClick={() => {
                onEditQuestion(record);
              }}
              style={{ color: '#337ab7', marginLeft: '20px', fontSize: '20px' }}
            />
          </div>
        );
      }
    }
  ];

  useEffect(() => {
    getQuestionQuery(query, page).then((response) => {
      const res = response.data;
      console.log(res);
      setDataSource(res.questions.filter((value) => !questionIds.includes(value._id)).reverse());
      setInitialDataSource(
        res.questions.filter((value) => !questionIds.includes(value._id)).reverse()
      );
      const dataDetailId = dataDetail.map((value) => value._id);
      // setDataSource(res.questions);
      setDataSource(res.questions.filter((value) => !dataDetailId.includes(value._id)));
      setInitialDataSource(res.questions.filter((value) => !dataDetailId.includes(value._id)));
      setTotalPage(res.questionCount);
    });
  }, [page, query, toggleReset]);

  return (
    <BasicLayout>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 48%)',
          width: '100%',
          justifyContent: 'space-between'
        }}>
        <div>
          <Search
            placeholder="Search for questions..."
            allowClear
            autoFocus={true}
            enterButton="Search"
            onSearch={(value) => {
              setQuery(value);
              setToggleReset(!toggleReset);
              setPage(1);
            }}
          />
          <Table
            style={{ marginTop: '24px' }}
            columns={CreateTestDetailTableData}
            dataSource={dataSource}
            rowKey={'_id'}
            pagination={{
              showSizeChanger: false,
              showQuickJumper: true,
              total: totalPage,
              current: page,
              onChange: (page) => setPage(page)
            }}
          />
        </div>
        {isEditing && (
          <CreateTestModal
            resetEditing={resetEditing}
            setDataSource={setDataSource}
            editingQuestion={editingQuestion}
            setEditingQuestion={setEditingQuestion}
          />
        )}
        <TestDetails
          data={dataDetail}
          setDataDetail={setDataDetail}
          questionIds={questionIds}
          setDataSource={setDataSource}
          dataSource={dataSource}
          initialDataSource={initialDataSource}
        />
      </div>
    </BasicLayout>
  );
};

export default CreateTestPage;
