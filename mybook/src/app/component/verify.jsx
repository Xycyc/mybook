import React from 'react';
import { Card } from 'antd';
import './verify.less';

class Verify extends React.Component {

	render() {
        return (<Card style={{ width: 300 }}>
            <p>注册成功！请前往邮箱进行验证！</p>
            <a href="http://www.baidu.com">www.baidu.com</a>
        </Card>)
    }
}
export default Verify;