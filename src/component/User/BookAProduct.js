/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Space,
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
} from 'antd';
import './user.css'
import { reserveproduct } from '../../Redux/Actions/ProductAction';
import Loading from '../../layout/Loader/Loading';


const BookAproduct = () => {
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();

    const { userInfo: user } = useSelector(state => state.user)
    const { loadingRr } = useSelector(state => state.reserve)
    const { productReserved, loading } = useSelector(state => state.product)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [Datefrom, setDatefrom] = useState("");
    const [Todate, setTodate] = useState("");
    const [Clicked, setClicked] = useState(false)

    const onChange = (date, dateString) => {
        setDatefrom(dateString[0])
        setTodate(dateString[1])
    };

    const handelFormData = async (values) => {
        const obj = {
            rentedByUser: user?._id,
            rentedcar: id,
            Datefrom: Datefrom,
            Todate: Todate,
            description: values.description

        }
        if (Datefrom !== "" && Todate !== "") {
            setClicked(true)
            dispatch(reserveproduct(obj))
            setDatefrom("")
            setTodate("")


        } else {
            alert("select date first")
        }
    }



    useEffect(() => {
        if (Clicked && productReserved) {
            alert("success")
            setClicked(false)
            if (user) return navigate(`/${user?.Role}`)
        }
        setTodate('')
        // eslint-disable-next-line
    }, [productReserved, Clicked]);

    const { TextArea } = Input;


    return (
        <>
            {loadingRr ?
                <Loading />
                :

                <div className='Book_A_Ride'>
                    <div className='form'>
                        <Form
                            form={form}
                            disabled={loading}
                            onFinish={(values) => {
                                handelFormData(values)

                            }}

                        >

                            <Form.Item label="Name" name='Name'>
                                <Input type='text' defaultValue={user.name} />
                            </Form.Item>
                            <Form.Item label="Email" name='Email' >
                                <Input type='email' defaultValue={user.email} />
                            </Form.Item>
                            <Form.Item label="Mobile No" name='Mobile No'>
                                <InputNumber style={{ width: 200, }} defaultValue={user.phoneNo} minLength="0" maxLength="10" />
                            </Form.Item>


                            <Form.Item label="Date" name='date'>
                                <Space direction="vertical" size={12}>
                                    <RangePicker onChange={onChange} />
                                </Space>
                            </Form.Item>

                            <Form.Item label="description" name='description'>
                                <TextArea rows={4} placeholder="describe the purpose of your ride" />
                            </Form.Item>
                            <Form.Item className='d-flex justify-content-center '  >
                                <Button type="primary" htmlType="submit"> Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            }
        </>
    )
}

export default BookAproduct