import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { green, lightBlue, red } from "@material-ui/core/colors";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import classnames from "classnames";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteUser } from "../../../actions/authAction";
import AlertDialog from "../../common//frequent/dialog/AlertDialog";

class ListUser extends Component {
	state = {
		content: "",
		negButton: "",
		posButton: "",
		currentUserId: null,
		deleteDialog: false
	};

	removeUser = () => {
		const userId = this.state.currentUserId;
		deleteUser(userId).then(res => {
			console.log(res);
			this.handleClose();
			this.props.fetchUser();
		});
	};

	handleDeleteOpen = userId => event => {
		this.setState({ deleteDialog: true, currentUserId: userId });
	};

	// handleEdit = id => event => {
	// 	// this.setState({ currentUserId: id });
	// 	this.context.router.push({
	// 		//browserHistory.push should also work here
	// 		pathname: EditUser,
	// 		state: { id: id }
	// 	});
	// };

	getRole = users => {
		if (users.role === 0) return "president";
	};

	handleClickOpen = () => {
		this.setState({ deleteDialog: true });
	};
	handleClose = () => {
		this.setState({ deleteDialog: false });
	};
	render() {
		const { classes, users } = this.props;
		return (
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Action</TableCell>
					</TableRow>
				</TableHead>
				<AlertDialog
					open={this.state.deleteDialog}
					handleClose={this.handleClose}
					negButtonClick={this.handleClose}
					posButtonClick={this.removeUser}
					title="Are you sure you want to delete the user ?"
					posButton="agree"
					negButton="disagree"
				/>
				<TableBody>
					{users.map((user, id) => (
						<TableRow key={id}>
							<TableCell component="th" scope="row">
								{id}
							</TableCell>
							<TableCell align="left">{user.user.name.first}</TableCell>
							<TableCell align="left">{user.user.email}</TableCell>
							<TableCell align="left">{this.getRole(user)}</TableCell>
							<TableCell align="left">
								<VisibilityIcon
									className={classnames(classes.preview, classes.icon)}
								/>
								<Link to={`/users/edit/${user.user._id}`}>
									<Icon
										// onClick={this.handleEdit(user.user_id)}
										className={classnames(classes.edit, classes.icon)}
									/>
								</Link>
								<DeleteIcon
									onClick={this.handleDeleteOpen(user.user._id)}
									className={classnames(classes.delete, classes.icon)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		);
	}
}

const styles = theme => ({
	cardCategoryWhite: {
		"&,& a,& a:hover,& a:focus": {
			color: "rgba(255,255,255,.62)",
			margin: "0",
			fontSize: "14px",
			marginTop: "0",
			marginBottom: "0"
		},
		"& a,& a:hover,& a:focus": {
			color: "#FFFFFF"
		}
	},
	cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "300",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none",
		"& small": {
			color: "#777",
			fontSize: "65%",
			fontWeight: "400",
			lineHeight: "1"
		}
	},
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3
	},
	table: {
		minWidth: 500
	},
	tableWrapper: {
		overflowX: "auto"
	},
	fab: {
		float: "right"
	},
	icon: {
		margin: theme.spacing.unit * 1,
		cursor: "pointer"
	},
	preview: {
		color: lightBlue[500]
	},
	edit: {
		color: green[700]
	},
	delete: {
		color: red[500]
	}
});

export default withStyles(styles)(ListUser);
