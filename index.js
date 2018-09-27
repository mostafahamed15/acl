function ACL() {

	this.roles = {};

	this.a  = function(roleName) {
		if (this.roles.hasOwnProperty(roleName) === false) {
			throw "Role does not exist!";
			return;
		}
		this.roleName = roleName;
		return this;
	};

	this.an = this.a;

	this.can = function(permission) {
		if (['get', 'post', 'put', 'delete', 'patch'].indexOf(permission.toLowerCase()) === -1) {
			throw "Invalid permission!";
			return;
		}
		this.permission = permission;
		return this;
	}

	this.from = function(route) {
		if(this.roles[this.roleName][this.permission].indexOf(route) === -1) {
			this.roles[this.roleName][this.permission].push(route)
		}
		return route;
	}

	this.to = this.from;

	this.createRole = function(roleName) {
		if (this.roles.hasOwnProperty(roleName) === false) {
			this.roles[roleName] = {
				get: [],
				post: [],
				put: [],
				patch: [],
				delete: []
			};
			return;
		}
		throw "Role do exists!";
	};

	this.deleteRole = function(roleName) {
		if (this.roles.hasOwnProperty(roleName) === true) {
			delete this.roles[roleName];
		}
	};

	var Check = function(roles) {
		this.roles = roles;
		this.if = function(roleName) {
			if (this.roles.hasOwnProperty(roleName) === false) {
				throw "Role does not exist!";
				return;
			}
			this.roleName = roleName;
			return this;
		};
		this.can = function(permission) {
			if (this.roles[this.roleName].hasOwnProperty(permission) === false)
			{
				throw "Invalid permission!";
			}
			this.permission = permission;
			return this;
		};
		this.to = function(route) {
			if (this.roles[this.roleName][this.permission].indexOf(route) === -1) {
				return false;
			}
			return true;
		};
		this.from = this.to;
	};
	this.check = new Check(this.roles);
}
var acl = new ACL();
module.exports = acl;