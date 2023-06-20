import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Select, Space, Table, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

interface DataType {
  key:number;
  course: string;
  name: string;
  week: number;
  time: string;
  status: string;
  reason: string;
  operation: string;
}

type DataIndex = keyof DataType;

const LeaveRequest: React.FC = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [leaveData, setLeaveData] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(`http://8.130.86.79:8072/office-service/student/info?studentId=10205101485`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    })
    .then(response => response.json())
    .then((value)=> {
    })
  })
  
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
  
  const mydata: DataType[] = [
    {
      key:1,
      course: '高级编程',
      name: '张彩仪',
      week: 1,
      time: '2023-05-30 18:00',
      status: '待审批',
      reason: '身体不舒服',
      operation: '同意',
    },
    {
      key:2,
      course: '高级编程',
      name: '朱岩',
      week: 4,
      time: '2023-06-03 18:00',
      status: '待审批',
      reason: '胃病，想要去医院',
      operation: '同意',
    },
    {
      key:3,
      course: 'JAVA面向对象',
      name: '张彩仪',
      week: 1,
      time: '2023-05-30 18:00',
      status: '待审批',
      reason: '身体不舒服',
      operation: '同意',
    },
    {
      key:4,
      course: 'JAVA面向对象',
      name: '张彩仪',
      week: 1,
      time: '2023-05-30 18:00',
      status: '待审批',
      reason: '身体不舒服',
      operation: '同意',
    }
  ]


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
      dataIndex: 'course',
      key: 'course',
      width: '15%',
      ...getColumnSearchProps('course'),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: '12%',
      ...getColumnSearchProps('name'),
    },
    {
      title: '课时',
      dataIndex: 'week',
      key: 'week',
      width: '10%',
      ...getColumnSearchProps('week'),
      sorter: (a, b) => a.week - b.week,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '原因',
      dataIndex: 'reason',
      key: 'reason',
      width: '18%',
      ...getColumnSearchProps('reason'),
    },
    {
      title: '提交时间',
      dataIndex: 'time',
      key: 'time',
      width: '20%',
      ...getColumnSearchProps('time'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      ...getColumnSearchProps('status'),
      render: () => (<Tag color={'green'} key={'1'}>待审核</Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      width: '20%',
      render: () => (
        <Space size="middle">
          <a>同意</a>
          <a>拒绝</a>
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
          defaultValue="高级编程"
          style={{ width: 140,marginRight:20 }}
          onChange={handleChange}
          options={[
            { value: '高级编程', label: '高级编程' },
            { value: '云计算', label: '云计算' },
          ]}
        />
        {/* <Search placeholder="input search text" allowClear  style={{ width: 300, marginBottom: 20}} /> */}
        <Table columns={columns} dataSource={mydata} />
    </div>
  );
};

export default LeaveRequest;