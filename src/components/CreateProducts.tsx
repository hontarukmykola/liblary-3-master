import { Button, Form, FormProps, Input, InputNumber, message, Select, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GenreModel, GenreOption, ProductFormField } from '../model/products';
import { LeftOutlined } from '@ant-design/icons';

const api = "workstation id=LibraryDB.mssql.somee.com;packet size=4096;user id=Mukolaa_SQLLogin_1;pwd=34aagjlufn;data source=LibraryDB.mssql.somee.com;persist security info=False;initial catalog=LibraryDB;TrustServerCertificate=True";

export default function CreateProduct() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState<GenreOption[]>([]);

    useEffect(() => {
        fetch(api + "categories")
            .then(res => res.json())
            .then(data => {
                const items = data as GenreModel[];
                setCategories(items.map(x => {
                    return { label: x.name, value: x.id };
                }));
            })
    }, []);

    const onSubmit: FormProps<ProductFormField>['onFinish'] = (item) => {

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
                <Form.Item<ProductFormField> label="Name" name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<ProductFormField> label="Price" name="price">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Discount" name="discount">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Quantity" name="quantity">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Genre" name="genreId">
                    <Select options={categories}></Select>
                </Form.Item>
                <Form.Item<ProductFormField> label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item<ProductFormField> label="Image" name="imageUrl">
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
