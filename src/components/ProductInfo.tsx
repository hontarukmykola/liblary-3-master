import { LeftOutlined } from '@ant-design/icons'
import { Button, Flex, Skeleton, Space, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HotelModel } from '../model/products';
const api = "workstation id=LibraryDB.mssql.somee.com;packet size=4096;user id=Mukolaa_SQLLogin_1;pwd=34aagjlufn;data source=LibraryDB.mssql.somee.com;persist security info=False;initial catalog=LibraryDB;TrustServerCertificate=True";
type QuaryParams = {
    id: string;
}
export default function ProductInfo() {
    const { id } = useParams<QuaryParams>();
    const navigate = useNavigate();
    const [item, setItem] = useState<HotelModel | null>(null);
    useEffect(() => {
        setTimeout(() => {
            fetch(api + id).then(res => res.json()).then(data => setItem(data));
        }, 5000)
    }, []);
    return (
        <>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>
            {item
                ?
                <div>
                    <h2>Room number:{item.number}</h2>
                    <p>Room rating:{item.rating}</p>
                    <p>Price: {item.price}$</p>
                    <p>Discount: {item.discount}%</p>
                    <p>Rating: {item.rating > 0 ?
                        <Tag color="green">{item.rating}</Tag>
                        :
                        <Tag color="volcano">Very expensive!</Tag>}</p>
                    <p>Room flour:{item.flour}</p>
                    <p>Amount of people:{item.amoundOfPeople}</p>
                    <p>Amount of bed:{item.amoundOfBed}</p>
                </div>
                :
                <Flex gap="middle" vertical>
                    <Space>
                        <Skeleton.Input active />
                        <Skeleton.Input active />
                    </Space>
                    <Skeleton
                        paragraph={{
                            rows: 0,
                        }}
                    />
                    <Skeleton.Image />
                    <Skeleton active />
                </Flex>
            }
        </>
    )
}