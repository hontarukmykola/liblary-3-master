import { Button, Form, FormProps, Input, InputNumber, message, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useNavigate } from 'react-router-dom';
import {HotelFormField } from '../model/products';
import { LeftOutlined } from '@ant-design/icons';

const api = "workstation id=LibraryDB.mssql.somee.com;packet size=4096;user id=Mukolaa_SQLLogin_1;pwd=34aagjlufn;data source=LibraryDB.mssql.somee.com;persist security info=False;initial catalog=LibraryDB;TrustServerCertificate=True";

export default function CreateProduct() {

    const navigate = useNavigate();


    const onSubmit: FormProps<HotelFormField>['onFinish'] = (item) => {

        console.log(item);

        fetch(api, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if (res.status === 200) {
                message.success("Product created successfully!");
                navigate("/products");
            }
            else
                message.error("Something went wrong!");
        });
    }

    return (
        <div>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>

            <h2>Add new book</h2>

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 19,
                }}
                layout="horizontal"
                onFinish={onSubmit}
            >
                <Form.Item<HotelFormField> label="Number" name="number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<HotelFormField> label="Rating" name="rating">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<HotelFormField> label="Discount" name="discount">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<HotelFormField> label="Flour" name="flour">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<HotelFormField> label="Amount of People" name="amoundOfPeople">
                <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<HotelFormField> label="Amount of Bed" name="amoundOfBed">
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button type="default" htmlType="reset">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}
