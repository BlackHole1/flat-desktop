import { FLAT_SERVER_DOMAIN } from './Process';

export const FLAT_SERVER_PROTOCOL = {
    HTTPS: `https://${FLAT_SERVER_DOMAIN}`,
    WSS: `wss://${FLAT_SERVER_DOMAIN}`,
}

export const FLAT_SERVER_VERSIONS = {
    V1HTTPS: `${FLAT_SERVER_PROTOCOL.HTTPS}/v1`,
    V1WSS: `${FLAT_SERVER_PROTOCOL.WSS}/v1`,
}

export const FLAT_SERVER_LOGIN = {
    WSS_LOGIN: `${FLAT_SERVER_VERSIONS.V1WSS}/Login`,
    WECHAT_CALLBACK: `${FLAT_SERVER_VERSIONS.V1HTTPS}/login/weChat/callback`,
    HTTPS_LOGIN: `${FLAT_SERVER_VERSIONS.V1HTTPS}/login`,
}
