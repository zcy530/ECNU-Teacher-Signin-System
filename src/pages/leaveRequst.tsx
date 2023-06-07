import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, List, Select, Skeleton } from 'antd';
import Search from 'antd/es/input/Search';

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const LeaveRequest: React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [list, setList] = useState<DataType[]>([]);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <div>
        <Select
          defaultValue="全部"
          style={{ width: 140,marginRight:20 }}
          onChange={handleChange}
          options={[
            { value: '2022春季学期', label: '2022春季学期' },
            { value: '2022秋季学期', label: '2022秋季学期' },
            { value: '2023春季学期', label: '2023春季学期' },
            { value: '2023秋季学期', label: '2023秋季学期' },
          ]}
        />
        <Select
          defaultValue="全部"
          style={{ width: 140,marginRight:20 }}
          onChange={handleChange}
          options={[
            { value: '已通过', label: '已通过' },
            { value: '待审批', label: '待审批' },
            { value: '未通过', label: '未通过' },
          ]}
        />
        <Search placeholder="input search text" allowClear  style={{ width: 300, marginBottom: 20}} />
        <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
            <List.Item  actions={[<a key="list-loadmore-edit">查看详情</a>, <a key="list-loadmore-more">操作</a>]}>
              <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name?.last}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <div style={{marginLeft:60}}><Badge  color='green' text='已通过'/></div>
                  <div style={{marginLeft:20,marginRight:10}}>2023-5-30 17:30:00</div>
              </Skeleton>
            </List.Item>
        )}
        />
    </div>
  );
};

export default LeaveRequest;