//acl Module
function ACL() {
    // empty object you can create roles and put on it
	this.roles = {};
    // variable a can create role.
	this.a  = function(roleName) {
		if (this.roles.hasOwnProperty(roleName) === false) {
			throw "Role does not exist!";
			return;
		}
		this.roleName = roleName;
		return this;
	};

	this.an = this.a;
    // Function can return permission and http verps.
	this.can = function(permission) {
		if (['get', 'post', 'put', 'delete', 'patch'].indexOf(permission.toLowerCase()) === -1) {
			throw "Invalid permission!";
			return;
		}
		this.permission = permission;
		return this;
	}
    // With function form you can return route or end point
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
    // function check can make test on roles
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