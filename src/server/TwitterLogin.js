import twitterTokenManager from "./TwitterTokenManager";

export function handleTwitterLogin(req, res) {
	twitterTokenManager.getRequestToken(req, res);
}

export function getUser(req, res) {
	twitterTokenManager.getAccessToken(req, res);
}