import React from 'react';
import { Component } from 'react';
// import Card from 'reactstrap/lib/Card';
// import CardSubtitle from 'reactstrap/lib/CardSubtitle';
// import CardText from 'reactstrap/lib/CardText';
// import CardTitle from 'reactstrap/lib/CardTitle';

import {
	Card,
	// CardImg,
	// CardBody,
	CardTitle,
	CardText,
	CardSubtitle,
	// Breadcrumb,
	// BreadcrumbItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Label,
	Col,
	Row,
} from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class Comments extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false,
		};

		this.toggleModal = this.toggleModal.bind(this);
		this.handleComment = this.handleComment.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleComment(values) {
		this.toggleModal();
		console.log('Current state is: ' + JSON.stringify(values));
		alert('Current state is: ' + JSON.stringify(values));
	}

	render() {
		const comments = this.props.comments.map((comment) => {
			return (
				<Card key={comment.id} className='mt-3 mb-3 p-3'>
					<CardText>{comment.comment}</CardText>
					<CardTitle>{comment.author}</CardTitle>
					<CardSubtitle>
						{new Intl.DateTimeFormat('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						}).format(new Date(Date.parse(comment.date)))}
					</CardSubtitle>
					<CardSubtitle>Rating: {comment.rating}</CardSubtitle>
				</Card>
			);
		});
		return (
			<>
				<div className='mb-5'>
					<h4>Comments:</h4>
					{comments}
					<Button outline onClick={this.toggleModal}>
						<span className='fa fa-edit fa-lg'></span> Submit
						Comment
					</Button>
				</div>

				<Modal
					isOpen={this.state.isModalOpen}
					toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>
						Submit Comment
					</ModalHeader>
					<ModalBody>
						<LocalForm
							onSubmit={(values) => this.handleComment(values)}>
							<Row className='form-group'>
								<Col>
									<Label htmlFor='rating'>Rating</Label>
									<Control.select
										model='.rating'
										name='rating'
										className='form-control'>
										<option value='1'>1</option>
										<option value='2'>2</option>
										<option value='3'>3</option>
										<option value='4'>4</option>
										<option value='5'>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className='form-group'>
								<Col>
									<Label htmlFor='author'>Your Name</Label>
									<Control.text
										model='.author'
										id='author'
										name='author'
										className='form-control'
										placeholder='Your Name'
										validators={{
											required,
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className='text-danger'
										model='.author'
										show='touched'
										messages={{
											required: 'Required! ',
											minLength:
												'Must be greater than 2 characters. ',
											maxLength:
												'Musy be 15 characters or less',
										}}
									/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Col>
									<Label htmlFor='comment'>Comment</Label>
									<Control.textarea
										model='.comment'
										id='comment'
										className='form-control'
										name='comment'
										rows='4'
									/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Col>
									<Button type='submit' color='primary'>
										Submit
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</>
		);
	}
}

export default Comments;
