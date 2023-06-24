import BASE from './base';
const Method = {}
// Method.CheckUserLogin = function(data) {
// 	if (!Auth.check()) {
// 		console.log(Auth.token());
// 		console.log("================Auth.token()===============")
// 		uni.navigateTo({
// 			url: "/pages/login/login"
// 		})
// 		return false;
// 	}

// 	return true;
// }

// Method.CheckUserLoginAndRole = function(data) {
// 	if (!Auth.check()) {
// 		console.log(Auth.token());
// 		console.log("================Auth.token()===============")
// 		uni.navigateTo({
// 			url: "/pages/login/login"
// 		})
// 		return false;
// 	}

// 	return true;
// }

// Method.CheckUserRoleType = function(data) {
// 	let roleType = uni.getStorageSync('roleType');
// 	console.log(roleType)
// 	if (roleType != BASE.SHOP_ROLE && roleType != BASE.CAREGIVER_ROLE) {
// 		uni.navigateTo({
// 			url: "/pages/role-choose/role-choose"
// 		})
// 		return false;
// 	}

// 	return true;
// }
Method.IsShop = () => {
	let roleType = localStorage.getItem('roleType');
	if (roleType == BASE.SHOP_ROLE) return true;
	return false;
}
Method.IsCaregiver = () => {
	let roleType = localStorage.getItem('roleType');
	if (roleType == BASE.CAREGIVER_ROLE) return true;
	return false;
}

export default Method
