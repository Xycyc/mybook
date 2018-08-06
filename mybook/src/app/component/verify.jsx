import React from 'react';
import { Card } from 'antd';
import './verify.less';
import { Link } from 'react-router-dom';

class Verify extends React.Component {

	render() {
        return (<Card style={{ width: 300 }}>
            <p>注册成功！请前往邮箱进行验证！</p>
            <Link to="/login">返回登录页</Link>
        </Card>)
    }
}
export default Verify;