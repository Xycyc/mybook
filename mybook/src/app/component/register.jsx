import React from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
	state = {
		confirmDirty: false,
		autoCompleteResult: [],
		captcha:"jfi7",
		canvas:""
	};
	constructor(){
		super();
		this.captcha = "dfgr";
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				console.log(this.props)
				this.props.history.push('/verify')
			}
		});
	}

	handleConfirmBlur = (e) => {
		const value = e.target.value;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	handleCaptchaBlur = (e) => {
		const value = e.target.value;
		// this.setState({ confirmDirty: this.state.confirmDirty || !!value , captcha:"serw"});
		this.captcha = "serw";
		// this.forceUpdate();
		this.drawCanvas();
	}
	compareToFirstPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	}

	compareCaptcha = (rule, value, callback) => {
		if(value && value !== this.captcha){
			callback("请输入正确的验证码！");
		}else{
			callback();
		}
	}

	validateToNextPassword = (rule, value, callback) => {
		const form = this.props.form;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}
	drawCanvas = (canvas) => {
		let ctx = null;
		if (!canvas) { 
			ctx=this.state.canvas.getContext("2d");
			ctx.clearRect(0,0,600,67)

		}else{
			ctx=canvas.getContext("2d");
			this.setState({canvas:canvas})
			
		}
		console.log(canvas)
		// this._canvas = canvas;
		ctx.fillStyle="#fff";
		ctx.fillRect(0,0,120,120)
		var c=this.captcha//随机的字
		const fs=36;//字体的大小
		const deg=22;//字体的旋转角度
		ctx.font=fs+'px Simhei';
		ctx.textBaseline="top";
		ctx.fillStyle="#000";
		ctx.save();
		ctx.translate(30*10+15,15);
		ctx.rotate(deg*Math.PI/180);
		ctx.fillText(c,-15+5,-15);
		ctx.restore();
	}
	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 8,
				},
			},
		};
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormItem
					{...formItemLayout}
					label="E-mail"
				>
					{getFieldDecorator('email', {
						rules: [{
							type: 'email', message: 'The input is not valid E-mail!',
						}, {
							required: true, message: 'Please input your E-mail!',
						}],
					})(
						<Input />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="Password"
				>
					{getFieldDecorator('password', {
						rules: [{
							required: true, message: 'Please input your password!',
						}, {
							validator: this.validateToNextPassword,
						}],
					})(
						<Input type="password" />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="Confirm Password"
				>
					{getFieldDecorator('confirm', {
						rules: [{
							required: true, message: 'Please confirm your password!',
						}, {
							validator: this.compareToFirstPassword,
						}],
					})(
						<Input type="password" onBlur={this.handleConfirmBlur} />
					)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="验证码"
				>
					{getFieldDecorator('captcha', {
						rules: [{
							required: true, message: '请输入验证码!',
						}, {
							validator: this.compareCaptcha,
						}],
					})(
						<Input />
					)}
				</FormItem>
				<FormItem>
					<canvas ref={this.drawCanvas} width="600" height="67" onClick={this.handleCaptchaBlur}></canvas>
				</FormItem>
				<FormItem {...formItemLayout}>
					
						<label>单击注册，表示同意<a href="">agreement</a></label>
					
				</FormItem>
				<FormItem {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">Register</Button>
				</FormItem>
			</Form>
		);
	}
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;