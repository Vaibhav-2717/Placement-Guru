import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Tabs, Input, Button, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/actions/userActions";
import { postJob } from "../redux/actions/jobActions";
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
function PostJob() {
  const [jobInfo, setJobInfo] = useState({});
  const [activeTab, setActiveTab] = useState("0");
  const dispatch = useDispatch()

  function onFirstFormFinish(values) {
    if(!values.title.match(/^[a-zA-Z ]{2,30}$/)){
       message.error('Incorrect Title')
    }else if(!values.department.match(/^[a-zA-Z ]{2,30}$/)){
      message.error('Incorrect department name')
   }
   else if(!(values.salaryFrom>99 && values.salaryTo>99 && (values.salaryTo>values.salaryFrom))){
     message.error('Invalid Salary');
   }
   else if(!isNaN(values.skillsRequired)){
    message.error('wrong format of skills')
   }else if(!isNaN(values.smallDescription) && values.smallDescription.length<50 && values.smallDescription.length>5){
  message.error('Put right description format')
   }else if(!isNaN(values.fullDescription) && values.smallDescription.length>15 ){
  message.error('Put right full description format')
}
    else{
    setJobInfo(values);
    setActiveTab("1");
  }
}
  function onFinalFormFinish(values) {
    if(!values.company.match(/^[a-zA-Z\-0-9]{2,40}$/)){
      message.error('Incorrect company name')
   }else if(!values.phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
      message.error('Phone number is not valid');
    }
    else if(!values.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
      message.error('Email pattern is not valid');
    }
    else if(!isNaN(values.companyDescription)){
      message.error('wrong Description format')
    }
    else{
       const finalObj = {...jobInfo , ...values};
      console.log(finalObj)
      dispatch(postJob(finalObj))
    }
  }
  return (
    <div>
      <DefaultLayout>
        <Tabs defaultActiveKey="0" activeKey={activeTab}>
          <TabPane tab="Job Info" key="0">
            <Form layout="vertical" onFinish={onFirstFormFinish}>
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="title"
                    rules={[{ required: true }]}
                    label="Title"
                  >
                    <Input/>
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="department"
                    rules={[{ required: true }]}
                    label="Department"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="experience"
                    rules={[{ required: true }]}
                    label="Experience"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="salaryFrom"
                    rules={[{ required: true }]}
                    label="Salary From"
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="salaryTo"
                    rules={[{ required: true }]}
                    label="Salary To"
                  >
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="skillsRequired"
                    rules={[{ required: true }]}
                    label="Skills"
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="minimumQualification"
                    rules={[{ required: true }]}
                    label="Minimum Qualification"
                  >
                    <Select>
                      <Option value="Degree">Mca</Option>
                      <Option value="Plus 2">Btech</Option>
                      <Option value="10th">12th</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.Item
                    name="smallDescription"
                    rules={[{ required: true }]}
                    label="Small description"
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.Item
                    name="fullDescription"
                    rules={[{ required: true }]}
                    label="Full description"
                  >
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>
              </Row>

              <Button htmlType="submit">Next</Button>
            </Form>
          </TabPane>
          <TabPane tab="Company Info" key="1">
            <Form layout='vertical' onFinish={onFinalFormFinish}>
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="company"
                    label="Company Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  </Col>
                  <Col lg={8} sm={24}>
                  <Form.Item
                    name="email"
                    label="Company Email"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  </Col>

                  <Col lg={8} sm={24}>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone number"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  </Col>
                  <Col lg={24} sm={24}>
                  <Form.Item
                    name="companyDescription"
                    label="Company Description"
                    rules={[{ required: true }]}
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                  </Col>
              
              </Row>
              <Button onClick={()=>{setActiveTab("0")}}>Previous</Button>
              <Button htmlType="submit">Post Job</Button>
            </Form>
          </TabPane>
        </Tabs>
      </DefaultLayout>
    </div>
  );
}

export default PostJob;
