import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Select, Space, Table, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

interface DataType {
  noteId: number;
  week: number;
  reason: string;
  time: string;
  status: number;
  term: string;
  name: string | null;
  refuseReason: string | null;
  type: string | null;
  changeTime: string | null;
  id: number | null;
  student_id: number;
  course_id: string;
  courseName: string;
  professor_id: number;
  professorName: string;
  attach: string;
}
type DataIndex = keyof DataType;

const LeaveRequest: React.FC = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [leaveData, setLeaveData] = useState<DataType[]>([]);
  const [term, setTerm] = useState("2023年春季学期")
  const [courseId, setCourseId] = useState("CRXFA-31yemoDAS0")
  

  useEffect(() => {

    const leavebody = {
        "professorId": "5103909",
        "status": "1",
        "courseId": courseId,
        "term": term,
        "pageParams": {
            "pageNumber": "1",
            "pageSize": "10"
        }
    }
    fetch(`http://8.130.86.79:8072/leave-service/professor/leaverecord`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(leavebody)
    })
    .then(response => response.json())
    .then((value)=> {
      console.log(value)
      setLeaveData(value)
    })
  },[courseId])
  
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setCourseId(value)
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };
  
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const columns: ColumnsType<DataType> = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName',
      ...getColumnSearchProps('courseName'),
    },
    {
      title: '请假学生',
      dataIndex: 'student_id',
      key: 'student_id',
      ...getColumnSearchProps('student_id'),
    },
    {
      title: '课时',
      dataIndex: 'week',
      key: 'week',
      sorter: (a, b) => a.week - b.week,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '原因',
      dataIndex: 'reason',
      key: 'reason',
      ...getColumnSearchProps('reason'),
    },
    {
      title: '提交时间',
      dataIndex: 'time',
      key: 'time',
      ...getColumnSearchProps('time'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status'),
      render: () => (<Tag color={'green'} key={'2'}>待审核</Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: '20%',
      render: () => (
        <Space size="middle">
          <Button type='primary'>同意</Button>
          <Button type='primary'>拒绝</Button>
        </Space>
      ),
    },
  ];
  

  return (
    <div>
        <Select
          defaultValue="2023春季学期"
          style={{ width: 140,marginRight:20,marginBottom:20 }}
          onChange={handleChange}
          options={[
            { value: '2022春季学期', label: '2022春季学期' },
            { value: '2022秋季学期', label: '2022秋季学期' },
            { value: '2023春季学期', label: '2023春季学期' },
            { value: '2023秋季学期', label: '2023秋季学期' },
          ]}
        />
        <Select
          defaultValue="云计算"
          style={{ width: 140,marginRight:20 }}
          onChange={handleChange}
          options={[
            { value: 'FRKNP-G74eWf9c4B', label: '高级编程' },
            { value: 'CRXFA-31yemoDAS0', label: '云计算' },
          ]}
        />
        {/* <Search placeholder="input search text" allowClear  style={{ width: 300, marginBottom: 20}} /> */}
        <Table columns={columns} dataSource={leaveData} />
    </div>
  );
};

export default LeaveRequest;