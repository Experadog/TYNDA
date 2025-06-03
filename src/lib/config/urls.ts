export enum URL_ENTITIES {
	//auth
	LOGIN = '/auth/login',
	LOGOUT = '/auth/logout',
	REFRESH_TOKEN = '/auth/refresh-token',
	CALLBACK_GOOGLE = '/auth/login/callback_from_google',

	//sys
	REGISTER = '/sys/users/register',
	PROFILE = '/sys/users/me',
	ACTIVATE_ACCOUNT = '/sys/users/activate',
	PHONE_PRE_VERIFY = '/sys/users/pre-verify-phone-telegram',
	VERIFY_PHONE = '/sys/users/verify-phone',
	UPDATE_CREDENTIALS = '/sys/users/password/reset',
	PERMISSIONS = '/sys/perm',
	ROLES = '/sys/permission_groups',
	STAFF = '/sys/establishment_staff',
	USERS = '/sys/users',
	CREATE_USER_ADMIN = '/sys/users/admin-add-user',

	//biz
	CARD_HISTORY = '/biz/card_history/client-history',

	//base
	LOAD_FILE = '/base/resources',

	//org
	ESTABLISHMENT_ALL_CLIENT = '/org/establishment/all-client',
	ESTABLISHMENT_ALL_ESTABLISHER = '/org/establishment/all-establisher',
	ESTABLISHMENT_ALL_ADMIN = '/org/establishment/all',
	ESTABLISHMENT_DETAIL = '/org/establishment/detail',
	ESTABLISHMENT_CREATION_ADMIN = '/org/establishment/admin',

	ESTABLISHMENT_CREATION = '/org/establishment',
	ESTABLISHMENT_DELETION = '/org/establishment',
	ESTABLISHMENT_UPDATING = '/org/establishment',

	//mes
	CHAT_MY = '/mes/chat/my',
	ESTABLISHMENT_CHAT = '/mes/chat',
	CHAT_DETAILED = '/mes/chat',
	CHAT_ESTABLISHMENT = '/mes/chat/establishment',
}

export enum URL_LOCAL_ENTITIES {
	CLEAR_SESSION = '/clear-session',
	REFRESH_SESSION = '/refresh-session',
}

export const WEBSOCKET_API = 'wss://soyuz.kg/skgapi/v1/mes/chat/ws?token=';
