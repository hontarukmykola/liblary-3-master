import { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, TableProps, Tag } from 'antd';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { HotelModel } from '../model/products';
const api = "https://shop-pd211-awdhcvf3ebdpb7es.polandcentral-01.azurewebsites.net/api/products/";
const Products = () => {
    const [products, setProducts] = useState<HotelModel[]>([]);
    useEffect(() => {
        // code...
        fetch(api + "all").then(res => res.json()).then(data => {
            const items = data as HotelModel[];
            setProducts(items.sort((x, y) => y.id - x.id));
        });
    }, []);
    const columns: TableProps<HotelModel>['columns'] = [
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Rating',
            key: 'rating',
            dataIndex: 'rating',
            render: (_, record) => (
                record.rating > 0 ?
                    <Tag color="green">Available {record.rating}</Tag>
                    :
                    <Tag color="volcano">Very exp.</Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/details/${record.id}`}>
                        <Button color="primary" icon={<InfoCircleOutlined />} />
                    </Link>
                    <Popconfirm
                        title="Delete the product"
                        description={`Are you sure to delete room number${record.number}?`}
                        onConfirm={() => onDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const onDelete = (id: number) => {
        const index = products.findIndex(x => x.id === id);
        if (index !== -1) {
            // delete from server
            fetch(api + id, {
                method: "DELETE"
            }).then(res => {
                if (res.status === 200) {
                    setProducts(products.filter((_, i) => i !== index));
                    message.success('Product deleted successfully!');
                }
                else
                    message.error("Something went wrong!");
            })
        }
        else
            message.error('Product does not found!');
    }
    return (<Table columns={columns} dataSource={products} rowKey="id" />)
}
export default Products;